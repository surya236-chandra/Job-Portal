// import React from 'react'
// import { useLocation } from 'react-router-dom';
// import {user} from "@clerk/react"

// const ProtectedRoute = ({children}) => {
//     const {isSignedIn, user, isLoaded} = useUser();
//     useLocation {pathname} = useLocation();
//   return children;
// }

// export default ProtectedRoute

import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (
    isLoaded &&
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoute;