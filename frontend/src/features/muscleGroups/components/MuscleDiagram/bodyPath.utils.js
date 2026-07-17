export const createPartLookup = (parts) => new Map(
    parts.map(part => [part.slug, part.paths]),
);

export const collectPaths = (lookup, slugs) => (
    slugs.flatMap(slug => lookup.get(slug) ?? [])
);

export const selectPaths = (lookup, slug, indices) => {
    const paths = lookup.get(slug) ?? [];

    return indices.flatMap(index => paths[index] ? [paths[index]] : []);
};
