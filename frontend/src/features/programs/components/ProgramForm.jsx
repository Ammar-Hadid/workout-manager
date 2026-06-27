import { useState } from "react"

import DefaultButton from "../../../shared/components/DefaultButton.jsx";
import FormInput from "../../../shared/components/FormInput.jsx";
import FormSelect from "../../../shared/components/FormSelect.jsx";
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
    fixed inset-0 z-50 bg-bg-primary/80 p-md
    flex items-center justify-center
    transition-opacity duration-200 ease-out`;

    const stateModalClassList = isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
    // #endregion

    return (
        <div className={`${modalClassList} ${stateModalClassList}`}>
            <div className="relative flex w-full max-w-form flex-col gap-xl rounded-card border border-text-secondary/20 bg-bg-surface-elevated p-xl text-text-primary shadow-2xl md:p-2xl">

                <button aria-label="Close form" className="absolute right-lg top-lg rounded-full w-lg h-lg text-text-secondary cursor-pointer transition hover:bg-danger-200 hover:text-danger" onClick={() => setIsModalOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <h2 className="pr-2xl text-h3 font-semibold">{mode === "edit" ? 'Edit program' : 'Create program'}</h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-lg">
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
