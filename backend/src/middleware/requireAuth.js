import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined.');


const requireAuth = (req, res, next) => {

    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ error: 'Unauthorized.' })

        const decoded = jwt.verify(token, JWT_SECRET)

        req.userId = decoded.userId;

        next();
    }

    catch (error) {
        console.error(error)
        return res.status(401).json({ error: 'Unauthorized.' });
    }
}

export default requireAuth;

