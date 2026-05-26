import { useState } from "react"

import DefaultButton from "../common/DefaultButton.jsx";

import FormInput from "../common/FormInput.jsx";
import FormSelect from "../common/FormSelect.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";



const getmuscleGroupOptions = (muscleGroups) => {
    return muscleGroups?.map(m => {
        return { value: m?.id, label: m?.label };
    })
}

const getInitialFormData = (selectedExercise) => {
    if (selectedExercise) {
        return {
            name: selectedExercise.name,
            muscleGroup: selectedExercise.muscleGroup,
            restTime: selectedExercise.restTime,
            sets: selectedExercise.sets,
            minReps: selectedExercise.minReps,
            maxReps: selectedExercise.maxReps,
        }
    }

    else {
        return {
            name: '',
            muscleGroup: '',
            restTime: '',
            sets: '',
            minReps: '',
            maxReps: '',
        }
    }
};


const FormContent = ({ initialData, muscleGroups, mode, isModalOpen, setIsModalOpen, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

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

        await onSubmit(formData);
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

                <h2 className="text-[2rem]">{mode === "edit" ? 'Edit exercise' : 'Create exercise'}</h2>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <FormInput
                        type="text"
                        name="name"
                        placeholder="Exercise name"
                        required
                        value={formData.name}
                        onChange={handleOnChange}
                    />

                    <FormSelect
                        name="muscleGroup"
                        placeholder="Select a muscle group"
                        required
                        value={formData.muscleGroup}
                        onChange={handleOnChange}
                        options={getmuscleGroupOptions(muscleGroups)}
                    />

                    {/* Row */}
                    <div className="flex w-full gap-7">
                        <FormInput
                            type="number"
                            name="restTime"
                            placeholder="Rest time (second)"
                            required
                            value={formData.restTime}
                            onChange={handleOnChange}
                            className="no-number-spinner"
                        />

                        <FormInput
                            type="number"
                            name="sets"
                            placeholder="Sets"
                            required
                            value={formData.sets}
                            onChange={handleOnChange}
                            className="no-number-spinner"
                        />
                    </div>

                    {/* Row */}
                    <div className="flex w-full gap-7">
                        <FormInput
                            type="number"
                            name="minReps"
                            placeholder="Min. reps"
                            required
                            value={formData.minReps}
                            onChange={handleOnChange}
                            className="no-number-spinner"
                        />

                        <FormInput
                            type="number"
                            name="maxReps"
                            placeholder="Max. reps"
                            required
                            value={formData.maxReps}
                            onChange={handleOnChange}
                            className="no-number-spinner"
                        />
                    </div>


                    <DefaultButton type="submit" className="uppercase hover:scale-[1.02]">
                        Save exercise
                    </DefaultButton>
                </form>
            </div>
        </div>
    )
}

const ExerciseForm = ({ selectedExercise, muscleGroups, mode, isModalOpen, setIsModalOpen, onSubmit }) => {
    const initialData = getInitialFormData(selectedExercise);
    const key = `${selectedExercise?._id ?? 'new'}-${mode}-${isModalOpen ? 'open' : 'closed'}`

    return (
        <FormContent
            key={key}
            initialData={initialData}
            muscleGroups={muscleGroups}
            mode={mode}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onSubmit={onSubmit}
        />
    )
}

export default ExerciseForm;