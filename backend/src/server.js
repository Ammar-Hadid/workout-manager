import 'dotenv/config'

import app from "./app.js";

import mongoose from 'mongoose';

const PORT = process.env.PORT || 40001;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB');

        app.listen(PORT, () => console.log(`Connected on port ${PORT}`))
    }

    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();