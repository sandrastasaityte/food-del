import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.token ||
    req.headers.authorization?.split(" ")[1]; // supports "Bearer <token>"

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ attach to req (not req.body)
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
