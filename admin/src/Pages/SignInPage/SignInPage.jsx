import React from "react";
import { SignIn } from "@clerk/react-router";
import "./Auth.css";

export default function SignInPage() {
  return (
    <div className="auth-container">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}
