import { useState, useEffect } from "react"
import ProgramCard from "../components/programs/ProgramCard.jsx";

import { getErrorMessage, throwApiError } from "../utils/errorHelper.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
    getAllPrograms,
    getOneProgram,
    createProgram,
    updateProgram,
    deleteProgram
} from "../api/programApi.js";

import ProgramForm from "../components/programs/ProgramForm.jsx";
import DefaultButton from "../components/common/DefaultButton.jsx";

import { useToast } from "../context/toastContext.jsx";
import { useConfirm } from "../context/confirmContext.jsx";

const ProgramsPage = () => {
    const [programs, setPrograms] = useState([]);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedProgram, setSelectedProgram] = useState(null);

    // Get all programs
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
    }, []);

    // Create program
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

                setIsModalOpen(false)
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

    const handleOnDelete = async (id) => {
        const isConfirmed = await confirm({
            mode: "danger",
            title: 'Are you sure you want to delete this program?',
            text: 'This will permanently delete all workouts and exercises inside it.',
            confirmText: 'Delete Program'
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

    // #region Tailwind styles
    const programsWrapperClasses =
        `
        bg-white text-black overflow-x-hidden
        relative
        pt-6 px-4 pb-4
        grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5`;
    // #endregion


    return (
        <div className="relative flex flex-col gap-8">
            {/* Programs wrapper */}
            <h1 className="text-[2.5rem]">Programs</h1>
            <div className={programsWrapperClasses}>
                {programs.length < 1 ? <h1 className="text-3xl">No programs found</h1>
                    : programs.map(program => {
                        return <ProgramCard
                            key={program._id}
                            program={program}
                            openModal={openModal}
                            setIsModalOpen={setIsModalOpen}
                            setSelectedProgram={setSelectedProgram}
                            onDelete={handleOnDelete}
                        />
                    })}
            </div>

            <DefaultButton className="fixed bottom-7 right-7 rounded-[100px] shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:scale-105 flex items-center justify-center gap-3 font-medium border border-white" onClick={() => openModal("create")}>
                <FontAwesomeIcon icon={faPlus} className="text-[22px]" />
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
