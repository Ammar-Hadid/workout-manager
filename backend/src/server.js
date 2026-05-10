import dotenv from 'dotenv'
dotenv.config();

import cors from "cors";

import express from 'express';
import mongoose from 'mongoose';

import authRouter from './routes/authRoutes.js';
import programRouter from './routes/programRoutes.js';
import workoutrRouter from './routes/workoutRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';
import muscleGroupsRouter from './routes/muscleGroupsRoutes.js';


const app = express();

const PORT = process.env.PORT;

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

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/programs', programRouter);
app.use('/api/programs/:programId/workouts', workoutrRouter);
app.use('/api/programs/:programId/workouts/:workoutId/exercises', exerciseRouter);

app.use('/api/muscle-groups', muscleGroupsRouter)

startServer();
