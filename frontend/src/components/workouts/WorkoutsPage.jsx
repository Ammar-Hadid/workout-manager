import { useState, useEffect, useActionState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
    getAllWorkouts,
    createWorkout,
    editWorkout,
    deleteWorkout,
} from "../../api/workoutApi.js";
import { getOneProgram } from "../../api/programApi.js";

import { throwApiError, getErrorMessage } from "../../utils/errorHelper.js";

import WorkoutCard from "./WorkoutCard.jsx";
import WorkoutForm from "./WorkoutForm.jsx";
import DefaultButton from "../common/DefaultButton.jsx";

import { useToast } from "../../context/toastContext.jsx";
import { useConfirm } from "../../context/confirmContext.jsx";



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
            const deletedWorkout = await deleteWorkout(programId, workoutId);

            setWorkouts(prev => prev.filter(workout => workout._id !== deletedWorkout._id));
        }

        catch (error) {
            showToast(getErrorMessage(error));
        }
    }
    // #endregion

    // #region Tailwind styles
    const workoutsWrapperClasses =
        `
        bg-white text-black overflow-x-hidden
        relative
        pt-6 px-4 pb-4
        grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10`;
    // #endregion

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-4xl">{`"${parentProgram?.name}" workouts`}</h1>

            <div className={workoutsWrapperClasses}>
                {workouts.length < 1 ? <h2 className="text-2xl">No workouts found</h2> :
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
            </div>

            <WorkoutForm
                selectedWorkout={selectedWorkout}
                mode={modalMode}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onSubmit={handleSaveWorkout}
            />

            <DefaultButton className="fixed bottom-7 right-7 rounded-[100px] shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:scale-105 flex items-center justify-center gap-3 font-medium border border-white" onClick={() => openModal("create")}>
                <FontAwesomeIcon icon={faPlus} className="text-[22px]" />
                Add workout
            </DefaultButton>
        </div>
    )
}

export default WorkoutsPage;