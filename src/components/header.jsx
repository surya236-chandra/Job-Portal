import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Show,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox, LogIn } from "lucide-react";

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
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            className="h-16 sm:h-20 w-auto object-contain"
            alt="Hirrd Logo"
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* NOT LOGGED IN */}
          <Show when="signed-out">
            <Button
              variant="blue"
              className="rounded-xl px-5 gap-1.5"
              onClick={() => setShowSignIn(true)}
            >
              <LogIn size={15} />
              <span>Login</span>
            </Button>
          </Show>

          {/* LOGGED IN */}
          <Show when="signed-in">
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="blue"
                  className="rounded-full px-5 gap-1.5 shadow-md shadow-blue-500/25"
                >
                  <PenBox size={16} />
                  <span>Post a Job</span>
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 rounded-full",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in-50 duration-200"
          onClick={handleOverlayClick}
        >
          <div className="relative">
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;