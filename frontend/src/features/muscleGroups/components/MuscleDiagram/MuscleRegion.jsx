const REGION_STYLES = {
    inactive: {
        fill: "url(#body-muscle)",
        stroke: "#294963",
        color: "#42647e",
        opacity: 0.72,
    },
    secondary: {
        fill: "url(#secondary-muscle)",
        stroke: "#5bb0ff",
        color: "#8bc8ff",
        opacity: 0.88,
        filter: "url(#muscle-glow)",
    },
    primary: {
        fill: "url(#primary-muscle)",
        stroke: "#1688ff",
        color: "#79bdff",
        opacity: 1,
        filter: "url(#muscle-glow)",
    },
};

const MuscleRegion = ({ id, state = "inactive", children }) => (
    <g
        id={`muscle-${id}`}
        data-muscle={id}
        data-state={state}
        style={REGION_STYLES[state] ?? REGION_STYLES.inactive}
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="transition-[opacity,filter] duration-300"
    >
        {children}
    </g>
);

export const MuscleFibers = ({ paths }) => (
    <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.52"
        pointerEvents="none"
    >
        {paths.map((path, index) => <path key={index} d={path} />)}
    </g>
);

export default MuscleRegion;
