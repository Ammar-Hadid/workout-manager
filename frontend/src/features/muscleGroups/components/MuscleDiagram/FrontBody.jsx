import MuscleRegion, { AnatomyRegion } from "./MuscleRegion.jsx";
import BodyPaths from "./BodyPaths.jsx";
import { collectPaths, createPartLookup } from "./bodyPath.utils.js";
import { MALE_FRONT_PARTS } from "./maleBodyPaths.js";

const FRONT_MUSCLE_GROUPS = {
    shoulders: ["deltoids"],
    chest: ["chest"],
    biceps: ["biceps"],
    triceps: ["triceps"],
    forearms: ["forearm"],
    abs: ["abs"],
    obliques: ["obliques"],
    quads: ["quadriceps"],
    calves: ["calves", "tibialis"],
};

const partLookup = createPartLookup(MALE_FRONT_PARTS);
const selectableSlugs = new Set(Object.values(FRONT_MUSCLE_GROUPS).flat());
const contextParts = MALE_FRONT_PARTS.filter(({ slug }) => (
    !selectableSlugs.has(slug) && slug !== "hair"
));

const FrontBody = ({ getMuscleState, paintIds }) => (
    <g filter={`url(#${paintIds.bodyShadow})`}>
        <AnatomyRegion paintIds={paintIds}>
            {contextParts.map(({ slug, paths }) => (
                <BodyPaths key={slug} name={`front-${slug}`} paths={paths} />
            ))}
        </AnatomyRegion>

        {Object.entries(FRONT_MUSCLE_GROUPS).map(([muscle, slugs]) => (
            <MuscleRegion
                key={muscle}
                id={muscle}
                state={getMuscleState(muscle)}
                paintIds={paintIds}
            >
                <BodyPaths
                    name={`front-${muscle}`}
                    paths={collectPaths(partLookup, slugs)}
                />
            </MuscleRegion>
        ))}

        <AnatomyRegion paintIds={paintIds} variant="hair">
            <BodyPaths name="front-hair" paths={partLookup.get("hair") ?? []} />
        </AnatomyRegion>
    </g>
);

export default FrontBody;
