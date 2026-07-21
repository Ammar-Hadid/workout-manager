import { calculateElapsedSeconds } from "../utils/WorkoutTimeElapsed.util";
import { useNow } from "../../../../shared/hooks/useNow.hook";

export const useElapsedTime = (startedAt) => {
    const now = useNow(1000);

    if (!startedAt) return 0;

    return calculateElapsedSeconds(startedAt, now);
}