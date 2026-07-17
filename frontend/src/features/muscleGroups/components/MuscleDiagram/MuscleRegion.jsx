const getRegionStyle = (state, paintIds) => {
    if (state === "primary") {
        return {
            fill: `url(#${paintIds.primary})`,
            stroke: "var(--color-primary)",
            filter: `url(#${paintIds.glow})`,
            opacity: 1,
        };
    }

    if (state === "secondary") {
        return {
            fill: `url(#${paintIds.secondary})`,
            stroke: "#65b5ff",
            filter: `url(#${paintIds.glowSoft})`,
            opacity: 0.9,
        };
    }

    return {
        fill: `url(#${paintIds.muscle})`,
        stroke: "#294a64",
        opacity: 0.8,
    };
};

const MuscleRegion = ({ id, state = "inactive", paintIds, clipPath, children }) => {
    const isActive = state !== "inactive";

    return (
        <g
            id={`muscle-${id}`}
            data-muscle={id}
            data-state={state}
            className="transition-[opacity,filter] duration-300"
            clipPath={clipPath ? `url(#${clipPath})` : undefined}
        >
            <g
                style={getRegionStyle(state, paintIds)}
                strokeWidth={isActive ? 1.65 : 0.9}
                strokeLinejoin="round"
            >
                {children}
            </g>

            <g
                fill={`url(#${paintIds.fibers})`}
                stroke="none"
                opacity={isActive ? 0.12 : 0.035}
                pointerEvents="none"
            >
                {children}
            </g>
        </g>
    );
};

export const AnatomyRegion = ({ paintIds, variant = "muscle", children }) => (
    <g
        fill={variant === "hair" ? "#071421" : `url(#${paintIds.muscle})`}
        stroke={variant === "hair" ? "#1c3448" : "#294a64"}
        strokeWidth="0.85"
        strokeLinejoin="round"
        opacity={variant === "hair" ? 0.94 : 0.78}
    >
        {children}
    </g>
);

export default MuscleRegion;
