export const MUSCLE_DIAGRAM_CONFIG = {
    chest: { view: "front", viewBox: "105 295 517 285" },
    back: { view: "back", viewBox: "820 285 523 390" },
    shoulders: { view: "front", viewBox: "98 290 531 300" },
    biceps: { view: "front", viewBox: "88 345 551 340" },
    triceps: { view: "back", viewBox: "785 330 593 370" },
    forearms: { view: "front", viewBox: "20 475 687 405" },
    abs: { view: "front", viewBox: "185 390 357 395" },
    obliques: { view: "front", viewBox: "145 395 437 385" },
    "lower-back": { view: "back", viewBox: "870 485 423 350" },
    quads: { view: "front", viewBox: "135 625 457 440" },
    hamstrings: { view: "back", viewBox: "855 690 453 445" },
    glutes: { view: "back", viewBox: "855 580 453 330" },
    calves: { view: "back", viewBox: "855 950 453 430" },
};

export const FULL_BODY_VIEWBOX = {
    front: "0 95 727 1280",
    back: "718 95 727 1280",
};

export const DEFAULT_MUSCLE_DIAGRAM_CONFIG = {
    view: "front",
    viewBox: FULL_BODY_VIEWBOX.front,
};
