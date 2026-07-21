import { useEffect, useState } from "react";

export const useNow = (intervalMs = 1000) => {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(Date.now());
        }, intervalMs);

        return () => clearInterval(intervalId);
    }, [intervalMs]);

    return now;
};