import React from "react";
import { SignUp } from "@clerk/react-router";
import "./Auth.css";

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
