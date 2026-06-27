import { MUSCLE_GROUPS } from "../../constants/muscleGroups.js";

export const getMuscleGroups = (req, res) => {
    return res.json({ muscleGroups: MUSCLE_GROUPS })
};

