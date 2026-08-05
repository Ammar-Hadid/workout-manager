export const calculateElapsedSeconds = (
    workoutSession,
    now,
) => {
    if (
        !Number.isFinite(workoutSession?.accumulatedMs)
    ) return null;

    const accumulatedMs = workoutSession?.accumulatedMs / 1000

    let totalSeconds = accumulatedMs;

    if (workoutSession?.status === 'in-progress') {
        if (!workoutSession?.activeStartedAt) return null;

        const activeStartedAtMs = new Date(workoutSession.activeStartedAt).getTime();

        if (!Number.isFinite(activeStartedAtMs)) {
            return null;
        }

        totalSeconds += Math.max(0, now - activeStartedAtMs) / 1000;
    }

    return totalSeconds;
}

export const calculateEstimatedTimeLeft = (
    workoutSession,
    now,
) => {
    if (
        workoutSession?.workoutDurationSnapshot == null ||
        workoutSession?.accumulatedMs == null
    ) {
        return null;
    }

    const durationMs =
        workoutSession.workoutDurationSnapshot * 60_000;

    let elapsedMs = workoutSession.accumulatedMs;

    if (workoutSession?.status === "in-progress") {
        if (!workoutSession.activeStartedAt) {
            return null;
        }

        const activeStartedAtMs =
            new Date(workoutSession.activeStartedAt).getTime();

        if (!Number.isFinite(activeStartedAtMs)) {
            return null;
        }

        elapsedMs += Math.max(
            0,
            now - activeStartedAtMs
        );
    }

    const remainingMs = Math.max(
        0,
        durationMs - elapsedMs
    );

    return Math.ceil(remainingMs / 60_000);
};

export const formatElapsedTime = (totalSeconds) => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));

    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    return [hours, minutes, seconds]
        .map(value => String(value).padStart(2, '0'))
        .join(':');
};