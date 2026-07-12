import { Dumbbell } from "lucide-react";
import DefaultButton from "../../../shared/components/DefaultButton";

import { SectionHeading } from "./SectionHeading.component";

const ActiveProgramItem = ({ label, value, className = "" }) => {
    return (
        <div className={`flex flex-col gap-sm ${className}`}>
            <p className="text-body-sm text-text-primary/50">{label}</p>
            <p className="text-body text-text-primary">{value}</p>
        </div>
    )
}

const ActiveProgramContainer = ({ activeProgram }) => {

    if (!activeProgram) return null;

    const { _id, name, split, trainingDaysPerWeek } = activeProgram;

    if (!_id || !name || !split || !trainingDaysPerWeek) return null;

    return (
        <div className="flex flex-col md:flex-row gap-lg justify-between md:items-center rounded-card bg-gradient-surface p-xl md:p-2xl border border-text-primary/15">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-xl md:gap-2xl lg:gap-3xl w-full">
                <div className="bg-bg-accent-surface p-xl rounded-xl border border-primary/50">
                    <Dumbbell className="text-text-primary/75 w-3xl h-3xl" strokeWidth={1} />
                </div>

                <div className="flex flex-col  gap-lg">
                    <div>
                        <SectionHeading label={'active program'} />
                        <h2 className="text-h3 font-medium font-display">{name}</h2>
                    </div>

                    <div className="flex">
                        <ActiveProgramItem label='Split Type' value={split} className="pr-md border-r border-text-primary/50" />
                        <ActiveProgramItem label='Training Days / Week' value={trainingDaysPerWeek} className="pl-md" />
                    </div>
                </div>
            </div>

            <DefaultButton to={`/programs/${_id}/workouts`} variant="secondary" className="whitespace-nowrap">
                View Program
            </DefaultButton>
        </div>
    )
}

export default ActiveProgramContainer;
