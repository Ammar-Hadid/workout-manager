import MuscleRegion, { AnatomyRegion } from "./MuscleRegion.jsx";
import BodyPaths from "./BodyPaths.jsx";
import {
    collectPaths,
    createPartLookup,
    selectPaths,
} from "./bodyPath.utils.js";
import { MALE_FRONT_PARTS } from "./maleBodyPaths.js";

const FRONT_MUSCLE_REGIONS = [
    { id: "upper-chest", slugs: ["chest"], clipKey: "upperChestClip" },
    { id: "mid-chest", slugs: ["chest"], clipKey: "midChestClip" },
    { id: "lower-chest", slugs: ["chest"], clipKey: "lowerChestClip" },
    { id: "traps", slugs: ["trapezius"] },
    { id: "side-delts", slugs: ["deltoids"], clipKey: "sideDeltsClip" },
    { id: "front-delts", slugs: ["deltoids"], clipKey: "frontDeltsClip" },
    { id: "biceps", slugs: ["biceps"] },
    { id: "triceps", slugs: ["triceps"] },
    { id: "forearms", slugs: ["forearm"] },
    { id: "serratus", slugs: ["serratus"] },
    { id: "upper-abs", slug: "abs", pathIndices: [0, 1, 2, 4, 5, 6] },
    { id: "lower-abs", slug: "abs", pathIndices: [3, 7] },
    { id: "obliques", slugs: ["obliques"] },
    { id: "hip-flexors", slugs: ["hipFlexors"] },
    { id: "adductors", slugs: ["adductors"] },
    { id: "quads", slugs: ["quadriceps"] },
    { id: "calves", slugs: ["calves", "tibialis"] },
];

const FRONT_MUSCLE_TRANSFORMS = {
    biceps: [
        "translate(202 0) scale(1.14 1) translate(-202 0)",
        "translate(526 0) scale(1.14 1) translate(-526 0)",
    ],
    triceps: [
        "translate(226 0) scale(1.1 1) translate(-226 0)",
        "translate(503 0) scale(1.1 1) translate(-503 0)",
    ],
};

const DERIVED_FRONT_PARTS = new Set([
    "upperChest",
    "lowerChest",
    "innerQuad",
    "outerQuad",
    "upperAbs",
    "lowerAbs",
    "frontDeltoid",
]);

const partLookup = createPartLookup(MALE_FRONT_PARTS);
const selectableSlugs = new Set(FRONT_MUSCLE_REGIONS.flatMap(region => (
    region.slugs ?? [region.slug]
)));
const contextParts = MALE_FRONT_PARTS.filter(({ slug }) => (
    !selectableSlugs.has(slug)
    && !DERIVED_FRONT_PARTS.has(slug)
    && slug !== "hair"
));

const getRegionPaths = (region) => (
    region.pathIndices
        ? selectPaths(partLookup, region.slug, region.pathIndices)
        : collectPaths(partLookup, region.slugs)
);

const FrontBody = ({ getMuscleState, paintIds }) => (
    <g filter={`url(#${paintIds.bodyShadow})`}>
        <AnatomyRegion paintIds={paintIds}>
            {contextParts.map(({ slug, paths }) => (
                <BodyPaths key={slug} name={`front-${slug}`} paths={paths} />
            ))}
        </AnatomyRegion>

        {FRONT_MUSCLE_REGIONS.map(region => (
            <MuscleRegion
                key={region.id}
                id={region.id}
                state={getMuscleState(region.id)}
                paintIds={paintIds}
                clipPath={region.clipKey ? paintIds[region.clipKey] : undefined}
            >
                <BodyPaths
                    name={`front-${region.id}`}
                    paths={getRegionPaths(region)}
                    pathTransforms={FRONT_MUSCLE_TRANSFORMS[region.id]}
                />
            </MuscleRegion>
        ))}

        <AnatomyRegion paintIds={paintIds} variant="hair">
            <BodyPaths name="front-hair" paths={partLookup.get("hair") ?? []} />
        </AnatomyRegion>
    </g>
);

export default FrontBody;
