import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';


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

startServer();
