import "dotenv/config";

import mongoose from "mongoose";
import WorkoutSession from "../../../src/features/sessions/workoutSessions/WorkoutSession.model.js";

const migrateCancelledToPaused = async () => {
    const statusResult = await WorkoutSession.collection.updateMany(
        { status: "cancelled" },
        { $set: { status: "paused" } },
    );

    const timestampResult = await WorkoutSession.collection.updateMany(
        { cancelledAt: { $exists: true } },
        { $rename: { cancelledAt: "pausedAt" } },
    );

    console.log(
        `Migration complete: ${statusResult.modifiedCount} statuses and ${timestampResult.modifiedCount} timestamps updated.`,
    );
};

const main = async () => {
    const [confirmation] = process.argv.slice(2);

    if (confirmation !== "--confirm") {
        throw new Error("Migration requires --confirm.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        await migrateCancelledToPaused();
    }

    finally {
        await mongoose.disconnect();
    }
};

main().catch(error => {
    console.error(`Migration failed: ${error.message}`);
    process.exit(1);
});
