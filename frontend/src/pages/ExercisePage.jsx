import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { getOneWorkout } from "../api/workoutApi";
import {
    getAllExercises,
    createExercise,
    editExercise,
    deleteExercise
} from "../api/exerciseApi";
import { getAllMuscleGroups } from "../api/muscleGroups.js";

import ExerciseCard from "../components/exercises/ExerciseCard.jsx";
import ExerciseForm from "../components/exercises/ExerciseForm.jsx";

import { getErrorMessage } from "../utils/errorHelper";

import { useToast } from "../context/toastContext.jsx";
import { useConfirm } from "../context/confirmContext.jsx";

import DefaultButton from "../components/common/DefaultButton.jsx";


const ExercisePage = () => {
    const { programId, workoutId } = useParams();

    const [parentWorkout, setParentWorkout] = useState({});
    const [exercises, setExercises] = useState([]);

    const [muscleGroups, setMuscleGroups] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [formMode, setFormMode] = useState("create");

    const { showToast } = useToast();
    const { confirm } = useConfirm();


    // #region get parent workout
    useEffect(() => {
        const fetchParentWorkout = async () => {
            try {
                const parentWorkout = await getOneWorkout(programId, workoutId);
                setParentWorkout(parentWorkout);
            }
            catch (error) {
                showToast(getErrorMessage(error));
            }
        }

        fetchParentWorkout();
    }, [programId, workoutId]);
    // #endregion

    // #region GET all exercises
    useEffect(() => {
        const fetchAllExercises = async () => {
            try {
                const allExercises = await getAllExercises(programId, workoutId);

                setExercises(allExercises);
            }

            catch (error) {
                showToast(getErrorMessage(error));
            }
        }

        fetchAllExercises();
    }, [programId, workoutId]);
    // #endregion

    // #region Get all muscle groups
    useEffect(() => {
        const getMuscleGroups = async () => {
            try {
                const muscleGroups = await getAllMuscleGroups();

                setMuscleGroups(muscleGroups);
            }

            catch (error) {
                showToast(getErrorMessage(error));
            }
        }

        getMuscleGroups();
    }, []);
    // #endregion

    // #region POST/PATCH exercises
    const openModal = (mode) => {
        if (mode === "create") {
            setFormMode("create");
            setIsModalOpen(true);
            setSelectedExercise(null);
        }

        else if (mode === "edit") {
            setFormMode("edit");
            setIsModalOpen(true)
        }
    }

    const handleSaveExercise = async (formData) => {
        if (formMode === "create") {
            try {
                const createdExercise = await createExercise(programId, workoutId, formData);

                setExercises(prev => (
                    [
                        ...prev,
                        createdExercise
                    ]
                ))

                setIsModalOpen(false);
            }
            catch (error) {
                showToast(getErrorMessage(error));
            }
        }

        else if (formMode === "edit") {
            try {
                const editedExercise = await editExercise(programId, workoutId, selectedExercise?._id, formData);

                setExercises(prev => {
                    return prev.map(exercise => {
                        if (exercise._id === editedExercise._id) {
                            return editedExercise
                        }

                        return exercise
                    })
                })

                setIsModalOpen(false);
            }

            catch (error) {
                showToast(getErrorMessage(error));
            }
        }
    }
    // #endregion

    // #region DELETE exercise
    const handleOnDelete = async (id) => {
        try {
            const isConfirmed = await confirm({
                mode: "danger",
                title: 'Are you sure you want to delete this exercise?',
                text: 'This will permanently delete the exercise.',
                confirmText: 'Delete exercise'
            });

            if (!isConfirmed) return;

            await deleteExercise(programId, workoutId, id);

            const updatedExercises = await getAllExercises(programId, workoutId);

            setExercises(updatedExercises);
        }

        catch (error) {
            showToast(getErrorMessage(error))
        }
    }
    // #region Tailwind styles
    const exercisesWrapperClasses =
        `bg-white text-black overflow-x-hidden
        relative
        pt-6 px-4 pb-4
        grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10`;
    // #endregion

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-4xl">{`"${parentWorkout?.name}" exercises`}</h1>

            <div className={exercisesWrapperClasses}>
                {exercises.length < 1 ? <h2 className="text-2xl">No exercises found</h2> :
                    [...exercises]
                        .sort((a, b) => a.order - b.order)
                        .map(exercise => {
                            return (
                                <ExerciseCard
                                    key={exercise._id}
                                    exercise={exercise}
                                    setSelectedExercise={setSelectedExercise}
                                    openModal={openModal}
                                    onDelete={handleOnDelete}
                                />
                            )
                        })
                }
            </div>

            <ExerciseForm
                selectedExercise={selectedExercise}
                muscleGroups={muscleGroups}
                mode={formMode}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmit={handleSaveExercise}
            />

            <DefaultButton className="fixed bottom-7 right-7 rounded-[100px] shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:scale-105 flex items-center justify-center gap-3 font-medium border border-white" onClick={() => openModal("create")}>
                <FontAwesomeIcon icon={faPlus} className="text-[22px]" />
                Add exercise
            </DefaultButton>
        </div>
    )
};

export default ExercisePage

