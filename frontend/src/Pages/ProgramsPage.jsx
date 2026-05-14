import { useState, useEffect } from "react"
import { useToast } from "../context/toastContext.jsx";
import ProgramCard from "../Components/ProgramCard.jsx";

import { getErrorMessage } from "../util/errorHelper";

import {
    getAllPrograms,
    getOneProgram,
    createProgram,
    updateProgram,
    deleteProgram
} from "../api/programApi.js";

const ProgramsPage = () => {
    const [programs, setPrograms] = useState([]);
    const { showToast } = useToast();

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


    return (
        <div className="relative">
            {/* Programs wrapper */}
            <div>
                {programs.length < 1 ? <h1 className="text-3xl">No programs found</h1>
                    : programs.map(program => {
                        return <ProgramCard
                            key={program.id}
                            name={program.name}
                            trainingDaysPerWeek={program.trainingDaysPerWeek}
                            isActive={program.isActive}
                        />
                    })}
            </div>

            <button className="text-white bg-black fixed py-4 px-5 rounded-[100px] shadow-2xl bottom-7 right-7 text-[20px] cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 flex items-center">
                Add program
            </button>
        </div>
    )
}

export default ProgramsPage