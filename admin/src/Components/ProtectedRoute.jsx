import React from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/react-router";

const ProtectedRoute = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

export default ProtectedRoute;
