import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is undefined.");

const optionalAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next();

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;
    }

    catch {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        });
    }

    next();
};

export default optionalAuth;
