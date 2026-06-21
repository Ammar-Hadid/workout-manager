import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
    getAllWorkouts,
    createWorkout,
    editWorkout,
    deleteWorkout,
} from "../api/workoutApi.js";
import { getOneProgram } from "../api/programApi.js";

import { throwApiError, getErrorMessage } from "../utils/errorHelper.js";

import WorkoutCard from "../components/workouts/WorkoutCard.jsx";
import WorkoutForm from "../components/workouts/WorkoutForm.jsx";
import DefaultButton from "../components/common/DefaultButton.jsx";

import { useToast } from "../context/toastContext.jsx";
import { useConfirm } from "../context/confirmContext.jsx";

import CardsWrapper from "../components/layout/CardsWrapper.jsx";


const WorkoutsPage = () => {
    const { programId } = useParams();
    const [parentProgram, setParentProgram] = useState({});

    const [workouts, setWorkouts] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const { showToast } = useToast();
    const { confirm } = useConfirm();

    // #region GET parent program
    useEffect(() => {
        const getParentProgram = async () => {
            try {
                const parentProgram = await getOneProgram(programId);

                setParentProgram(parentProgram);
            }

            catch (error) {
                console.error(error);
                throwApiError(getErrorMessage(error));
            }

        }

        getParentProgram();

    }, [programId])
    // #endregion

    // #region GET all workouts
    useEffect(() => {

        const fetchWorkouts = async () => {
            try {
                const workouts = await getAllWorkouts(programId);

                setWorkouts(workouts);
            }

            catch (error) {
                console.error(error);
                showToast(getErrorMessage(error));
            }
        };

        fetchWorkouts();
    }, [programId]);
    // #endregion

    // #region POST/PATCH

    const openModal = (mode) => {

        if (mode === "create") {
            setModalMode("create");
            setSelectedWorkout(null);
        }

        else if (mode === "edit") {
            setModalMode("edit");
        }

        setIsModalOpen(true)
    }

    const handleSaveWorkout = async (formData) => {
        if (modalMode === "create") {
            try {
                const createdWorkout = await createWorkout(programId, formData);

                setWorkouts(prev => (
                    [
                        createdWorkout,
                        ...prev
                    ]
                ))

                setIsModalOpen(false);
                showToast('Workout created successfully', "success");
            }

            catch (error) {
                console.error(error);
                showToast(getErrorMessage(error));
            }
        }

        else if (modalMode === 'edit') {
            try {
                const editedWorkout = await editWorkout(programId, selectedWorkout?._id, formData);

                setWorkouts(prev => {
                    return prev.map(workout => {
                        if (workout._id === editedWorkout._id) {
                            return editedWorkout
                        }

                        return workout
                    })
                })

                setIsModalOpen(false);
                showToast('Workout updated successfully.', 'success');
            }

            catch (error) {
                showToast(getErrorMessage(error));
            }
        }
    }
    // #endregion

    // #region DELETE
    const handleOnDelete = async (workoutId) => {
        const isConfirmed = await confirm({
            mode: "danger",
            title: 'Are you sure you want to delete this workout?',
            text: 'This will permanently delete all exercises  inside it.',
            confirmText: 'Delete workout'
        })

        if (!isConfirmed) return

        try {
            await deleteWorkout(programId, workoutId);

            const updatedWorkouts = await getAllWorkouts(programId);

            setWorkouts(updatedWorkouts);
        }

        catch (error) {
            showToast(getErrorMessage(error));
        }
    }
    // #endregion

    return (
        <div className="flex flex-col gap-2xl">
            <h1 className="text-h2 font-semibold">{`"${parentProgram?.name}" workouts`}</h1>

            <CardsWrapper>
                {workouts.length < 1 ? <h2 className="text-h5 text-text-secondary">No workouts found</h2> :
                    [...workouts]
                        .sort((a, b) => a.order - b.order)
                        .map(w => {
                            return (
                                <WorkoutCard
                                    key={w._id}
                                    workout={w}
                                    setSelectedWorkout={setSelectedWorkout}
                                    openModal={openModal}
                                    onDelete={handleOnDelete}
                                />
                            )
                        })
                }
            </CardsWrapper>

            <WorkoutForm
                selectedWorkout={selectedWorkout}
                mode={modalMode}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSubmit={handleSaveWorkout}
            />

            <DefaultButton className="fixed bottom-lg right-lg gap-sm border cursor-pointer border-text-primary/20 shadow-2xl hover:scale-105 md:bottom-xl md:right-xl" onClick={() => openModal("create")}>
                <FontAwesomeIcon icon={faPlus} className="text-body-lg" />
                Add workout
            </DefaultButton>
        </div>
    )
}

export default WorkoutsPage;
