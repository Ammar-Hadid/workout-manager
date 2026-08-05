export const MUSCLE_GROUPS = [
    { id: 'upper-chest', label: 'Upper Chest', category: 'Chest' },
    { id: 'mid-chest', label: 'Mid Chest', category: 'Chest' },
    { id: 'lower-chest', label: 'Lower Chest', category: 'Chest' },

    { id: 'lats', label: 'Lats', category: 'Back' },
    { id: 'upper-back', label: 'Upper Back', category: 'Back' },
    { id: 'traps', label: 'Traps', category: 'Back' },
    { id: 'lower-back', label: 'Lower Back', category: 'Back' },

    { id: 'front-delts', label: 'Front Delts', category: 'Shoulders' },
    { id: 'side-delts', label: 'Side Delts', category: 'Shoulders' },
    { id: 'rear-delts', label: 'Rear Delts', category: 'Shoulders' },

    { id: 'biceps', label: 'Biceps', category: 'Arms' },
    { id: 'triceps', label: 'Triceps', category: 'Arms' },
    { id: 'forearms', label: 'Forearms', category: 'Arms' },

    { id: 'upper-abs', label: 'Upper Abs', category: 'Core' },
    { id: 'lower-abs', label: 'Lower Abs', category: 'Core' },
    { id: 'obliques', label: 'Obliques', category: 'Core' },
    { id: 'serratus', label: 'Serratus', category: 'Core' },

    { id: 'hip-flexors', label: 'Hip Flexors', category: 'Legs' },
    { id: 'adductors', label: 'Adductors', category: 'Legs' },
    { id: 'quads', label: 'Quads', category: 'Legs' },
    { id: 'hamstrings', label: 'Hamstrings', category: 'Legs' },
    { id: 'glutes', label: 'Glutes', category: 'Legs' },
    { id: 'calves', label: 'Calves', category: 'Legs' },
];

export const MUSCLE_GROUP_IDS = MUSCLE_GROUPS.map(({ id }) => id);

// Existing records and historical workout snapshots can still contain these
// broad values. They remain valid for backwards compatibility but are no
// longer returned by the muscle-groups endpoint for new exercise selection.
export const LEGACY_MUSCLE_GROUP_IDS = ['chest', 'back', 'shoulders', 'abs'];

export const VALID_MUSCLE_GROUP_IDS = [
    ...MUSCLE_GROUP_IDS,
    ...LEGACY_MUSCLE_GROUP_IDS,
];
