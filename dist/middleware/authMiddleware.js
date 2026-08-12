import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret is not configured" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
