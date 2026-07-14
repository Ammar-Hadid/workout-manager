import MuscleRegion, { AnatomyRegion } from "./MuscleRegion.jsx";
import BodyPaths from "./BodyPaths.jsx";
import { collectPaths, createPartLookup } from "./bodyPath.utils.js";
import { MALE_BACK_PARTS } from "./maleBodyPaths.js";

const BACK_MUSCLE_GROUPS = {
    back: ["trapezius", "upperBack"],
    shoulders: ["deltoids"],
    triceps: ["triceps"],
    forearms: ["forearm"],
    "lower-back": ["lowerBack"],
    glutes: ["gluteal"],
    hamstrings: ["hamstring"],
    calves: ["calves"],
};

const partLookup = createPartLookup(MALE_BACK_PARTS);
const selectableSlugs = new Set(Object.values(BACK_MUSCLE_GROUPS).flat());
const contextParts = MALE_BACK_PARTS.filter(({ slug }) => (
    !selectableSlugs.has(slug) && slug !== "hair"
));

const BackBody = ({ getMuscleState, paintIds }) => (
    <g filter={`url(#${paintIds.bodyShadow})`}>
        <AnatomyRegion paintIds={paintIds}>
            {contextParts.map(({ slug, paths }) => (
                <BodyPaths key={slug} name={`back-${slug}`} paths={paths} />
            ))}
        </AnatomyRegion>

        {Object.entries(BACK_MUSCLE_GROUPS).map(([muscle, slugs]) => (
            <MuscleRegion
                key={muscle}
                id={muscle}
                state={getMuscleState(muscle)}
                paintIds={paintIds}
            >
                <BodyPaths
                    name={`back-${muscle}`}
                    paths={collectPaths(partLookup, slugs)}
                />
            </MuscleRegion>
        ))}

        <AnatomyRegion paintIds={paintIds} variant="hair">
            <BodyPaths name="back-hair" paths={partLookup.get("hair") ?? []} />
        </AnatomyRegion>
    </g>
);

export default BackBody;
