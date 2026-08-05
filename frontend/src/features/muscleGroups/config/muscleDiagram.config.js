export const MUSCLE_DIAGRAM_CONFIG = {
    "upper-chest": { view: "front", viewBox: "105 285 517 285" },
    "mid-chest": { view: "front", viewBox: "105 305 517 285" },
    "lower-chest": { view: "front", viewBox: "105 325 517 285" },

    lats: { view: "back", viewBox: "840 350 503 355" },
    "upper-back": { view: "back", viewBox: "840 280 503 330" },
    traps: { view: "back", viewBox: "875 245 433 315" },
    "lower-back": { view: "back", viewBox: "870 485 423 350" },

    "front-delts": { view: "front", viewBox: "98 285 531 300" },
    "side-delts": { view: "front", viewBox: "98 285 531 300" },
    "rear-delts": { view: "back", viewBox: "815 280 553 310" },

    biceps: { view: "front", viewBox: "88 345 551 340" },
    triceps: { view: "back", viewBox: "785 330 593 370" },
    forearms: { view: "front", viewBox: "20 475 687 405" },

    "upper-abs": { view: "front", viewBox: "185 380 357 335" },
    "lower-abs": { view: "front", viewBox: "185 475 357 335" },
    obliques: { view: "front", viewBox: "145 395 437 385" },
    serratus: { view: "front", viewBox: "145 365 437 315" },

    "hip-flexors": { view: "front", viewBox: "175 555 377 315" },
    adductors: { view: "front", viewBox: "135 625 457 440" },
    quads: { view: "front", viewBox: "135 625 457 440" },
    hamstrings: { view: "back", viewBox: "855 690 453 445" },
    glutes: { view: "back", viewBox: "855 580 453 330" },
    calves: { view: "back", viewBox: "855 950 453 430" },

    // Broad values are retained for old exercises and workout snapshots.
    chest: { view: "front", viewBox: "105 295 517 285" },
    back: { view: "back", viewBox: "820 285 523 390" },
    shoulders: { view: "front", viewBox: "98 290 531 300" },
    abs: { view: "front", viewBox: "185 390 357 395" },
};

export const LEGACY_MUSCLE_ALIASES = {
    chest: ["upper-chest", "mid-chest", "lower-chest"],
    back: ["lats", "upper-back", "traps"],
    shoulders: ["front-delts", "side-delts", "rear-delts"],
    abs: ["upper-abs", "lower-abs"],
};

export const FULL_BODY_VIEWBOX = {
    front: "0 95 727 1280",
    back: "718 95 727 1280",
};

export const DEFAULT_MUSCLE_DIAGRAM_CONFIG = {
    view: "front",
    viewBox: FULL_BODY_VIEWBOX.front,
};
