import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const adminAuth = [
  ClerkExpressRequireAuth(),
  (req, res, next) => {
    const user = req.auth?.sessionClaims;

    // Example: allow only specific emails as admins
    const adminEmails = ["your@email.com"];

    if (!user?.email || !adminEmails.includes(user.email)) {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }

    next();
  },
];

export default adminAuth;
