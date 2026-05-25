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
    fixed bg-black/50 inset-0
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
            <div className="flex flex-col gap-7 py-4 px-5 bg-white text-blck relative min-w-[30dvw]">

                <button onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} className="absolute top-5 right-5 text-black hover:text-red-500 cursor-pointer" />
                </button>

                <h2 className="text-[2rem]">{mode === "edit" ? 'Edit workout' : 'Create workout'}</h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
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