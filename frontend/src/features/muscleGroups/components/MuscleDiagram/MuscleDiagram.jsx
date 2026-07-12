import FrontBody from "./FrontBody.jsx";
import BackBody from "./BackBody.jsx";
import {
    DEFAULT_MUSCLE_DIAGRAM_CONFIG,
    MUSCLE_DIAGRAM_CONFIG,
} from "../../config/muscleDiagram.config.js";

const normalizeMuscles = (muscles) => (
    Array.isArray(muscles) ? muscles.filter(Boolean) : []
);

const MuscleDiagram = ({
    primaryMuscle,
    secondaryMuscles = [],
    className = "",
    showFullBody = false,
}) => {
    const selectedConfig = MUSCLE_DIAGRAM_CONFIG[primaryMuscle]
        ?? DEFAULT_MUSCLE_DIAGRAM_CONFIG;
    const config = showFullBody
        ? { ...selectedConfig, viewBox: DEFAULT_MUSCLE_DIAGRAM_CONFIG.viewBox }
        : selectedConfig;

    const secondary = normalizeMuscles(secondaryMuscles);
    const getMuscleState = (muscle) => {
        if (muscle === primaryMuscle) return "primary";
        if (secondary.includes(muscle)) return "secondary";
        return "inactive";
    };

    const Body = config.view === "back" ? BackBody : FrontBody;
    const label = primaryMuscle
        ? `${primaryMuscle.replaceAll("-", " ")} muscle diagram, ${config.view} view`
        : `${config.view} muscle diagram`;

    return (
        <div
            className={`relative isolate overflow-hidden bg-bg-accent-surface ${className}`}
            data-muscle-diagram={primaryMuscle || "none"}
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-[18%] top-1/2 h-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
            />

            <svg
                className="relative h-full w-full"
                viewBox={config.viewBox}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={label}
            >
                <defs>
                    <linearGradient id="body-muscle" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#19334b" />
                        <stop offset="0.48" stopColor="#10273c" />
                        <stop offset="1" stopColor="#0a1c2d" />
                    </linearGradient>
                    <linearGradient id="body-muscle-shadow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#152d43" />
                        <stop offset="1" stopColor="#081827" />
                    </linearGradient>
                    <linearGradient id="primary-muscle" x1="0" y1="0" x2="0.9" y2="1">
                        <stop offset="0" stopColor="#1688ff" />
                        <stop offset="0.5" stopColor="var(--color-primary)" />
                        <stop offset="1" stopColor="#004fb8" />
                    </linearGradient>
                    <linearGradient id="secondary-muscle" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#4aa5ff" />
                        <stop offset="1" stopColor="#0b69cf" />
                    </linearGradient>
                    <radialGradient id="body-core" cx="50%" cy="35%" r="70%">
                        <stop offset="0" stopColor="#18334d" />
                        <stop offset="1" stopColor="#071725" />
                    </radialGradient>
                    <filter id="muscle-glow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feFlood floodColor="var(--color-primary)" floodOpacity="0.5" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="body-shadow" x="-30%" y="-20%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#020a12" floodOpacity="0.75" />
                    </filter>
                </defs>

                <Body getMuscleState={getMuscleState} />
            </svg>
        </div>
    );
};

export default MuscleDiagram;
