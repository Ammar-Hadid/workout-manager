export const createPartLookup = (parts) => new Map(
    parts.map(part => [part.slug, part.paths]),
);

export const collectPaths = (lookup, slugs) => (
    slugs.flatMap(slug => lookup.get(slug) ?? [])
);
