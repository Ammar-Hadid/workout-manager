import { calculateElapsedSeconds } from "../utils/WorkoutTimeElapsed.util";
import { useNow } from "../../../../shared/hooks/useNow.hook";

export const useElapsedTime = (workoutSession) => {
    const now = useNow(1000);

    if (!workoutSession) return 0;

    return calculateElapsedSeconds(workoutSession, now);
}