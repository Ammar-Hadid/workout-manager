import { useState } from "react";
import FormInput from "../common/FormInput.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import DefaultButton from "../common/DefaultButton.jsx";

const getInitialFormData = (selectedWorkout) => {
    if (selectedWorkout) {
        return {
            name: selectedWorkout.name,
            duration: selectedWorkout.duration
        }
    }

    else {
        return {
            name: '',
            duration: ''
        }
    }
}

const WorkoutFormContent = ({ mode, initialFormData, isOpen, setIsOpen, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormData);

    // #region tailwind classes
    const modalClassList = `
    fixed inset-0 z-50 bg-bg-primary/80 p-md
    flex items-center justify-center
    transition-opacity duration-200 ease-out`;

    const stateModalClassList = isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
    // #endregion

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

    return (
        <div className={`${modalClassList} ${stateModalClassList}`}>
            <div className="relative flex w-full max-w-form flex-col gap-xl rounded-card border border-text-secondary/20 bg-bg-surface-elevated p-xl text-text-primary shadow-2xl md:p-2xl">

                <button aria-label="Close form" className="absolute right-lg top-lg rounded-pill w-lg h-lg cursor-pointer text-text-secondary transition hover:bg-danger-200 hover:text-danger" onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <h2 className="pr-2xl text-h3 font-semibold">{mode === "edit" ? 'Edit workout' : 'Create workout'}</h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-lg">
                    <FormInput
                        type="text"
                        placeholder="Workout name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleOnChange}
                    />

                    <FormInput
                        type="number"
                        placeholder="Workout duration (minutes)"
                        name="duration"
                        required
                        value={formData.duration}
                        onChange={handleOnChange}
                        className="no-number-spinner"
                    />

                    <DefaultButton type="submit" className="uppercase hover:scale-[1.02]">
                        Save workout
                    </DefaultButton>
                </form>
            </div>
        </div >
    )
}

const WorkoutForm = ({ selectedWorkout, mode, isOpen, setIsOpen, onSubmit }) => {
    const initialFormData = getInitialFormData(selectedWorkout);
    const formKey = `${mode}-${isOpen ? 'open' : 'closed'}-${selectedWorkout?._id ?? 'new'}`

    return (
        <WorkoutFormContent
            key={formKey}
            mode={mode}
            initialFormData={initialFormData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSubmit={onSubmit}
        />
    )
}

export default WorkoutForm
