import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");

function ClerkProviderWithRouter({ children }) {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
      signInUrl={import.meta.env.VITE_CLERK_SIGN_IN_URL || "/sign-in"}
      signUpUrl={import.meta.env.VITE_CLERK_SIGN_UP_URL || "/sign-up"}
      afterSignInUrl={import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL || "/dashboard"}
      afterSignUpUrl={import.meta.env.VITE_CLERK_AFTER_SIGN_UP_URL || "/dashboard"}
    >
      {children}
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRouter>
        <App />
      </ClerkProviderWithRouter>
    </BrowserRouter>
  </React.StrictMode>
);
