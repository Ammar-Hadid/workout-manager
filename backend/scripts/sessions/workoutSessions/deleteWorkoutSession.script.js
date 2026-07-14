import "dotenv/config";

import mongoose from "mongoose";
import WorkoutSession from "../../../src/features/sessions/workoutSessions/WorkoutSession.model.js";
import ExerciseSession from "../../../src/features/sessions/exerciseSessions/ExerciseSession.model.js";


const deleteWorkoutSession = async ({ userId, workoutSessionId }) => {

    if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new Error('Invalid user id.')
    }

    if (!mongoose.isValidObjectId(workoutSessionId)) {
        throw new Error('Invalid workout session id.')
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const workoutSession = await WorkoutSession.findOne(
            {
                user: userId,
                _id: workoutSessionId,
            },

            {
                _id: 1,
            },

            {
                session,
            }
        );

        if (!workoutSession) {
            throw new Error('Workout session not found');
        }

        await ExerciseSession.deleteMany(
            {
                user: userId,
                workoutSession: workoutSession._id,
            },

            {
                session,
            }
        );

        await WorkoutSession.deleteOne(
            {
                user: userId,
                _id: workoutSession._id,
            },

            {
                session,
            }
        );

        await session.commitTransaction();

        return console.log('Workout session successfully deleted');
    }

    catch {
        await session.abortTransaction();
        throw new Error('Something went wrong');
    }

    finally {
        session.endSession();
    }

}

const main = async () => {
    const [userId, workoutSessionId, confirmation] =
        process.argv.slice(2);

    if (process.env.NODE_ENV === 'production') {
        throw new Error("This script cannot run in production.");
    }

    if (confirmation !== '--confirm') {
        throw new Error("Deletion requires userId, workoutSessionId and --confirm.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        await deleteWorkoutSession({ userId, workoutSessionId });
    }

    finally {
        await mongoose.disconnect();
    }
}

main().catch(error => {
    console.error(`Deletion failed: ${error.message}`);
    process.exit(1);
})
