import { useState } from "react"

import DefaultButton from "../common/DefaultButton.jsx";
import FormInput from "../common/FormInput.jsx";
import FormSelect from "../common/FormSelect.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

const splitOptions = [
    { value: "full-body", label: "Full body" },
    { value: "ppl", label: "PPL" },
    { value: "upper-lower", label: "Upper Lower" },
    { value: "custom", label: "Custom" },
];

const getInitialFormData = (selectedProgram) => (
    selectedProgram ?
        {
            name: selectedProgram.name,
            split: selectedProgram.split,
            trainingDaysPerWeek: selectedProgram.trainingDaysPerWeek
        } :
        {
            name: '',
            split: '',
            trainingDaysPerWeek: '',
        }
);

const ProgramFormContent = ({ isModalOpen, setIsModalOpen, onSubmit, mode, initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData)
    }

    // #region tailwind classes
    const modalClassList = `
    fixed bg-black/50 inset-0
    flex items-center justify-center 
    transition-opacity duration-200 ease-out`;

    const stateModalClassList = isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
    // #endregion

    return (
        <div className={`${modalClassList} ${stateModalClassList}`}>
            <div className="flex flex-col gap-7 py-4 px-5 bg-white text-blck relative min-w-[30dvw]">

                <button onClick={() => setIsModalOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} className="absolute top-5 right-5 text-black hover:text-red-500 cursor-pointer" />
                </button>

                <h2 className="text-[2rem]">{mode === "edit" ? 'Edit program' : 'Create program'}</h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <FormInput
                        type="text"
                        placeholder="Program name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleOnChange}
                    />

                    {mode === "create" && (
                        <FormSelect
                            value={formData.split}
                            name="split"
                            required
                            onChange={handleOnChange}
                            placeholder="Select a split"
                            options={splitOptions}
                        />
                    )}

                    <FormInput
                        type="number"
                        placeholder="Training days per week"
                        name="trainingDaysPerWeek"
                        required
                        value={formData.trainingDaysPerWeek}
                        onChange={handleOnChange}
                        className="no-number-spinner"
                    />

                    <DefaultButton type="submit" className="uppercase hover:scale-[1.02]">
                        Save program
                    </DefaultButton>
                </form>
            </div>
        </div >
    )
}

const ProgramForm = ({ isModalOpen, setIsModalOpen, onSubmit, mode, selectedProgram }) => {
    const initialFormData = getInitialFormData(selectedProgram);
    const formKey = `${mode}-${isModalOpen ? "open" : "closed"}-${selectedProgram?._id ?? "new"}`;

    return (
        <ProgramFormContent
            key={formKey}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onSubmit={onSubmit}
            mode={mode}
            initialFormData={initialFormData}
        />
    )
}

export default ProgramForm;
