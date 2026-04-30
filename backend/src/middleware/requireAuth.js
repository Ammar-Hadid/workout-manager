import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' })
        };

        const token = authHeader.split(' ')[1];

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');
        const decoded = jwt.verify(token, JWT_SECRET)

        req.userId = decoded.userId;

        next();
    }

    catch (error) {
        console.error(`Error: ${error}`)
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

export default requireAuth;