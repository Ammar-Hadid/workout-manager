export const calculateElapsedSeconds = (
    startedAt,
    now,
) => {
    const startedAtMs = new Date(startedAt).getTime();

    if (!Number.isFinite(startedAtMs)) return 0;


    return Math.floor(
        Math.max(0, (now - startedAtMs) / 1000)
    );
}

export const calculateEstimatedTimeLeft = (
    workoutSession,
    now,
) => {
    if (
        !workoutSession?.workoutDurationSnapshot ||
        !workoutSession?.startedAt
    ) return null;

    const startedAtMs = new Date(workoutSession.startedAt).getTime();

    if (!Number.isFinite(startedAtMs)) return null;

    const durationMs = workoutSession.workoutDurationSnapshot * 60_000;


    const elapsedMs = now - startedAtMs;

    const remainingMs = Math.max(0, durationMs - elapsedMs);

    return Math.ceil(remainingMs / 60_000);
}

export const formatElapsedTime = (totalSeconds) => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));

    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    return [hours, minutes, seconds]
        .map(value => String(value).padStart(2, '0'))
        .join(':');
};