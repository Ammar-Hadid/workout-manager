import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/authRoutes.js';
import programRouter from './routes/programRoutes.js';


const app = express();

const PORT = process.env.PORT

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB');

        app.listen(PORT, () => console.log(`Connected on port ${PORT}`))
    }

    catch (error) {
        console.error(error)
    }
}

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/program', programRouter)

startServer();
