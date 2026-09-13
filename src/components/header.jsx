// import { Button } from "./ui/button";
// import { Link } from "react-router-dom";
// import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

// const Header = () => {
//   return (
//     <>
//     <nav className="relative z-10 py-4 flex justify-between items-center">
//         <Link>
//         <img src = '/logo.png' className="h-20"/>
//         </Link>

//         <div className="flex gap-8">
//   <Show When ="signed-out">
//     <Button variant="outline">Login</Button>
//   </Show>

//   <Show when="signed-in">
//     <Link to ="/post-job">
//     <Button variant="destructive" className= "rounded-full">
//       Post a Job
//     </Button>
//     </Link>
//     <UserButton />
//   </Show>
// </div>
//     </nav>
//     </>
//   )
// }

// export default Header

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Show,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">

          {/* NOT LOGGED IN */}
          <Show when="signed-out">
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>
          </Show>

          {/* LOGGED IN */}
          <Show when="signed-in">
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="destructive"
                  className="rounded-full"
                >
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-job"
                />

                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-job"
                />

                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </Show>

        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;