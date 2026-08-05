import MuscleRegion, { AnatomyRegion } from "./MuscleRegion.jsx";
import BodyPaths from "./BodyPaths.jsx";
import {
    collectPaths,
    createPartLookup,
    selectPaths,
} from "./bodyPath.utils.js";
import { MALE_BACK_PARTS } from "./maleBodyPaths.js";

const BACK_MUSCLE_REGIONS = [
    { id: "traps", slugs: ["trapezius"] },
    { id: "rear-delts", slugs: ["deltoids"] },
    { id: "upper-back", slug: "upperBack", pathIndices: [0, 2, 3, 4] },
    { id: "lats", slug: "upperBack", pathIndices: [1, 5] },
    { id: "triceps", slugs: ["triceps"] },
    { id: "forearms", slugs: ["forearm"] },
    { id: "lower-back", slugs: ["lowerBack"] },
    { id: "glutes", slugs: ["gluteal"] },
    { id: "hamstrings", slugs: ["hamstring"] },
    { id: "calves", slugs: ["calves"] },
];

const BACK_MUSCLE_TRANSFORMS = {
    triceps: [
        "translate(930 0) scale(1.12 1) translate(-930 0)",
        "translate(930 0) scale(1.12 1) translate(-930 0)",
        "translate(930 0) scale(1.12 1) translate(-930 0)",
        "translate(1238 0) scale(1.12 1) translate(-1238 0)",
        "translate(1238 0) scale(1.12 1) translate(-1238 0)",
        "translate(1238 0) scale(1.12 1) translate(-1238 0)",
    ],
};

const partLookup = createPartLookup(MALE_BACK_PARTS);
const selectableSlugs = new Set(BACK_MUSCLE_REGIONS.flatMap(region => (
    region.slugs ?? [region.slug]
)));
const contextParts = MALE_BACK_PARTS.filter(({ slug }) => (
    !selectableSlugs.has(slug) && slug !== "hair"
));

const getRegionPaths = (region) => (
    region.pathIndices
        ? selectPaths(partLookup, region.slug, region.pathIndices)
        : collectPaths(partLookup, region.slugs)
);

const BackBody = ({ getMuscleState, paintIds }) => (
    <g filter={`url(#${paintIds.bodyShadow})`}>
        <AnatomyRegion paintIds={paintIds}>
            {contextParts.map(({ slug, paths }) => (
                <BodyPaths key={slug} name={`back-${slug}`} paths={paths} />
            ))}
        </AnatomyRegion>

        {BACK_MUSCLE_REGIONS.map(region => (
            <MuscleRegion
                key={region.id}
                id={region.id}
                state={getMuscleState(region.id)}
                paintIds={paintIds}
            >
                <BodyPaths
                    name={`back-${region.id}`}
                    paths={getRegionPaths(region)}
                    pathTransforms={BACK_MUSCLE_TRANSFORMS[region.id]}
                />
            </MuscleRegion>
        ))}

        <AnatomyRegion paintIds={paintIds} variant="hair">
            <BodyPaths name="back-hair" paths={partLookup.get("hair") ?? []} />
        </AnatomyRegion>
    </g>
);

export default BackBody;
