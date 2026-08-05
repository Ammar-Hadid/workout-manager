import { useNow } from "../../../../shared/hooks/useNow.hook";
import { calculateEstimatedTimeLeft } from "../utils/WorkoutTimeElapsed.util";

export const useEstimatedTimeLeft = (workoutSession) => {
    const now = useNow(60_000);

    if (!workoutSession) return null;

    return calculateEstimatedTimeLeft(workoutSession, now);
}