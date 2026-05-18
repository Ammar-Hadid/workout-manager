import { useState, useEffect } from "react"

import DefaultButton from "../common/DefaultButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ProgramForm = ({ isModalOpen, setIsModalOpen, updatedFormData, onSubmit, mode, selectedProgram }) => {
    const initialFormData = selectedProgram ?
        {
            name: selectedProgram.name,
            split: selectedProgram.split,
            trainingDaysPerWeek: selectedProgram.trainingDaysPerWeek
        } :
        {
            name: '',
            split: '',
            trainingDaysPerWeek: '',
        };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(
            {
                ...initialFormData,
                ...updatedFormData,
            }
        )
    }, [isModalOpen, updatedFormData]);

    // #region tailwind classes
    const modalClassList = `
    fixed bg-black/50 inset-0
    flex items-center justify-center 
    transition-opacity duration-200 ease-out`;

    const stateModalClassList = isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';

    const inputClassList = `border-2 border-black p-2 focus:outline-0 text-black text-[18px]`

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

                <button onClick={() => setIsModalOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} className="absolute top-5 right-5 text-black hover:text-red-500 cursor-pointer" />
                </button>

                <h2 className="text-[2rem]">{mode === "edit" ? 'Edit program' : 'Create program'}</h2>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Program name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleOnChange}
                        className={inputClassList}
                    />

                    {mode === "create" && (
                        <div className="relative">
                            <FontAwesomeIcon icon={faChevronDown} className="absolute top-1/2 -translate-y-1/2 right-4" />
                            <select value={formData.split} name="split" required onChange={handleOnChange} className={`${inputClassList} w-full appearance-none`}>
                                <option value="" disabled>Select a split</option>

                                <option value="full-body">Full body</option>
                                <option value="ppl">PPL</option>
                                <option value="upper-lower">Upper Lower</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>)}

                    <input
                        type="number"
                        placeholder="Training days per week"
                        name="trainingDaysPerWeek"
                        required
                        value={formData.trainingDaysPerWeek}
                        onChange={handleOnChange}
                        className={`${inputClassList} no-number-spinner`}
                    />

                    <DefaultButton type="submit" className="uppercase hover:scale-[1.02]">
                        Save program
                    </DefaultButton>
                </form>
            </div>
        </div >
    )
}

export default ProgramForm;
