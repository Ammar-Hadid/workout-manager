import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');

const generateToken = userId => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
};

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ error: `All fields are required!` });
        }

        if (userName.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long!' })
        }

        if (password.length < 12) {
            return res.status(400).json({ error: 'Password must be at least 12 characters long!' });
        }

        const existingUser = await User.findOne({
            $or: [
                { email },
                { userName }
            ]
        })

        if (existingUser) {

            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Unable to register with these credentials!' });
            }

            if (existingUser.userName === userName) {
                return res.status(400).json({ error: `Username already taken, please try another one.` });
            }
        }

        const user = await User.create({ userName, email, password });

        const token = generateToken(user._id);

        setAuthCookie(res, token);

        return res.status(201).json({
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email
            },
        })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' })
    };
};

export const login = async (req, res) => {
    const { userName, password } = req.body;

    try {

        if (!userName || !password) {
            return res.status(400).json({ error: 'All fields are required!' })
        }

        const user = await User.findOne({ userName }).select('+password');

        if (!user) {

            return res.status(400).json({ error: 'Unable to sign in with these credentials!' })
        };

        const isValidLogin = await user.comparePasswords(password);

        if (!isValidLogin) {
            return res.status(400).json({ error: 'Unable to sign in with these credentials!' })
        };

        const token = generateToken(user._id);

        setAuthCookie(res, token);

        return res.status(200).json({
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email
            },
        })
    }

    catch (error) {
        console.error(error);
        res.status(500).json('Server error')
    }
};