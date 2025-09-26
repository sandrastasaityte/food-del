import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers; // expects token in headers as "token"
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // attach userId to request body
        next();
    } catch (error) {
        console.log("Auth error:", error);
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;
