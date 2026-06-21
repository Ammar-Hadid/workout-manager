import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
    getAllPrograms,
    getOneProgram,
    createProgram,
    updateProgram,
    deleteProgram,
    activateProgram
} from "../api/programApi.js";

import { useToast } from "../context/toastContext.jsx";
import { useConfirm } from "../context/confirmContext.jsx";

import { getErrorMessage, throwApiError } from "../utils/errorHelper.js";

import ProgramCard from "../components/programs/ProgramCard.jsx";
import ProgramForm from "../components/programs/ProgramForm.jsx";
import DefaultButton from "../components/common/DefaultButton.jsx";

import CardsWrapper from "../components/layout/CardsWrapper.jsx";

const ProgramsPage = () => {
    const [programs, setPrograms] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedProgram, setSelectedProgram] = useState(null);

    const { showToast } = useToast();
    const { confirm } = useConfirm();

    // #region GET all programs
    useEffect(() => {

        const fetchPrograms = async () => {
            try {
                const programs = await getAllPrograms();

                setPrograms(programs);
            }

            catch (error) {
                showToast(getErrorMessage(error))
            }
        }

        fetchPrograms();
    }, [showToast]);
    // #endregion

    // #region POST/PATCH functionality
    const handleSaveProgram = async (formData) => {
        if (modalMode === "create") {
            try {
                const createdProgram = await createProgram(formData);

                setPrograms(prev => (
                    [
                        createdProgram,
                        ...prev
                    ]
                ));

                setIsModalOpen(false);
                showToast('Program created successfully.', "success");
            }

            catch (error) {
                showToast(getErrorMessage(error));
            }
        }

        else if (modalMode === "edit") {
            try {
                const updatedProgram = await updateProgram(selectedProgram._id, formData);

                setPrograms(prev => {
                    return prev.map(program => {
                        if (program._id === updatedProgram._id) return updatedProgram
                        return program
                    })
                });

                setIsModalOpen(false)
                showToast('Program updated successfully.', "success");
            }

            catch (error) {
                showToast(getErrorMessage(error));
            }
        }
    }


    const openModal = (mode) => {
        if (mode === "create") {
            setModalMode("create");
            setSelectedProgram(null)
        }
        else if (mode === "edit") setModalMode("edit");


        setIsModalOpen(true)
    }
    // #endregion 

    // #region DELETE functionality
    const handleOnDelete = async (id) => {
        const isConfirmed = await confirm({
            mode: "danger",
            title: 'Are you sure you want to delete this program?',
            text: 'This will permanently delete all workouts and exercises inside it.',
            confirmText: 'Delete program'
        });

        if (!isConfirmed) return;

        try {
            await deleteProgram(id);

            setPrograms(prev => prev.filter(p => p._id !== id));
        }

        catch (error) {
            showToast(getErrorMessage(error));
        }
    }
    // #endregion 

    // #region program activation functionality
    const handleSetActive = async (id) => {
        try {
            const activatedProgram = await activateProgram(id);

            setPrograms(prev => {
                return prev.map(p => {
                    if (p._id === activatedProgram._id) {
                        return activatedProgram
                    }

                    return {
                        ...p,
                        isActive: false
                    }
                })
            })
        }

        catch (error) {
            showToast(getErrorMessage(error));
        }
    }
    // #endregion

    return (
        <div className="relative flex flex-col gap-2xl">
            {/* Programs wrapper */}
            <h1 className="text-h2 font-semibold">Programs</h1>
            <CardsWrapper>
                {programs.length < 1 ? <h2 className="text-h5 text-text-secondary">No programs found</h2>
                    : programs.map(program => {
                        return <ProgramCard
                            key={program._id}
                            program={program}
                            openModal={openModal}
                            setActive={handleSetActive}
                            setIsModalOpen={setIsModalOpen}
                            setSelectedProgram={setSelectedProgram}
                            onDelete={handleOnDelete}
                        />
                    })}
            </CardsWrapper>

            <DefaultButton className="fixed bottom-lg right-lg gap-sm border border-text-primary/20 shadow-2xl cursor-pointer hover:scale-105 md:bottom-xl md:right-xl" onClick={() => openModal("create")}>
                <FontAwesomeIcon icon={faPlus} className="text-body-lg" />
                Add program
            </DefaultButton>

            <ProgramForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmit={handleSaveProgram}
                mode={modalMode}
                selectedProgram={selectedProgram}
            />
        </div>
    )
}

export default ProgramsPage
