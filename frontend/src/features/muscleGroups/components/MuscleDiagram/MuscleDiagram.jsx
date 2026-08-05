import { useId } from "react";
import FrontBody from "./FrontBody.jsx";
import BackBody from "./BackBody.jsx";
import {
    DEFAULT_MUSCLE_DIAGRAM_CONFIG,
    FULL_BODY_VIEWBOX,
    LEGACY_MUSCLE_ALIASES,
    MUSCLE_DIAGRAM_CONFIG,
} from "../../config/muscleDiagram.config.js";

const normalizeMuscles = (muscles) => (
    Array.isArray(muscles) ? muscles.filter(Boolean) : []
);

const matchesMuscle = (selectedMuscle, diagramRegion) => (
    selectedMuscle === diagramRegion
    || LEGACY_MUSCLE_ALIASES[selectedMuscle]?.includes(diagramRegion)
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
        ? { ...selectedConfig, viewBox: FULL_BODY_VIEWBOX[selectedConfig.view] }
        : selectedConfig;
    const idPrefix = useId().replaceAll(":", "");
    const paintIds = {
        muscle: `${idPrefix}-muscle`,
        primary: `${idPrefix}-primary`,
        secondary: `${idPrefix}-secondary`,
        fibers: `${idPrefix}-fibers`,
        glow: `${idPrefix}-glow`,
        glowSoft: `${idPrefix}-glow-soft`,
        bodyShadow: `${idPrefix}-body-shadow`,
        upperChestClip: `${idPrefix}-upper-chest-clip`,
        midChestClip: `${idPrefix}-mid-chest-clip`,
        lowerChestClip: `${idPrefix}-lower-chest-clip`,
        frontDeltsClip: `${idPrefix}-front-delts-clip`,
        sideDeltsClip: `${idPrefix}-side-delts-clip`,
    };

    const secondary = normalizeMuscles(secondaryMuscles);
    const getMuscleState = (muscle) => {
        if (matchesMuscle(primaryMuscle, muscle)) return "primary";
        if (secondary.some(item => matchesMuscle(item, muscle))) return "secondary";
        return "inactive";
    };

    const Body = config.view === "back" ? BackBody : FrontBody;
    const label = primaryMuscle
        ? `${primaryMuscle.replaceAll("-", " ")} muscle diagram, ${config.view} view`
        : `${config.view} muscle diagram`;

    return (
        <div
            className={`relative isolate overflow-hidden bg-bg-primary ${className}`}
            data-muscle-diagram={primaryMuscle || "none"}
        >
            <svg
                className="relative h-full w-full"
                viewBox={config.viewBox}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={label}
            >
                <defs>
                    <clipPath id={paintIds.upperChestClip} clipPathUnits="userSpaceOnUse">
                        <rect x="245" y="310" width="240" height="61" />
                    </clipPath>
                    <clipPath id={paintIds.midChestClip} clipPathUnits="userSpaceOnUse">
                        <rect x="245" y="369" width="240" height="40" />
                    </clipPath>
                    <clipPath id={paintIds.lowerChestClip} clipPathUnits="userSpaceOnUse">
                        <rect x="245" y="407" width="240" height="34" />
                    </clipPath>

                    <clipPath id={paintIds.frontDeltsClip} clipPathUnits="userSpaceOnUse">
                        <path d="M240 292H290V405H230Z M437 292H487L497 405H437Z" />
                    </clipPath>
                    <clipPath id={paintIds.sideDeltsClip} clipPathUnits="userSpaceOnUse">
                        <path d="M180 285H250L235 410H180Z M477 285H547V410H492Z" />
                    </clipPath>

                    <linearGradient id={paintIds.muscle} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#1a354c" />
                        <stop offset="0.44" stopColor="#10283c" />
                        <stop offset="1" stopColor="#091a2a" />
                    </linearGradient>
                    <linearGradient id={paintIds.primary} x1="0.12" y1="0" x2="0.88" y2="1">
                        <stop offset="0" stopColor="#2b95ff" />
                        <stop offset="0.38" stopColor="var(--color-primary)" />
                        <stop offset="0.76" stopColor="#075ec9" />
                        <stop offset="1" stopColor="#03418f" />
                    </linearGradient>
                    <linearGradient id={paintIds.secondary} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#68b7ff" />
                        <stop offset="0.55" stopColor="#2589e8" />
                        <stop offset="1" stopColor="#0c579f" />
                    </linearGradient>
                    <pattern
                        id={paintIds.fibers}
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(-14)"
                    >
                        <path d="M0 7 H24" stroke="#c7e4ff" strokeWidth="0.85" opacity="0.62" />
                    </pattern>
                    <filter id={paintIds.glow} x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="3.2" result="blur" />
                        <feFlood floodColor="var(--color-primary)" floodOpacity="0.42" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={paintIds.glowSoft} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feFlood floodColor="#3e9ff5" floodOpacity="0.25" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={paintIds.bodyShadow} x="-18%" y="-12%" width="136%" height="130%">
                        <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#020a12" floodOpacity="0.68" />
                    </filter>
                </defs>

                <Body getMuscleState={getMuscleState} paintIds={paintIds} />
            </svg>
        </div>
    );
};

export default MuscleDiagram;
