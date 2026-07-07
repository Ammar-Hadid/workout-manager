import { Dumbbell } from "lucide-react";
import DefaultButton from "../../../shared/components/DefaultButton";
import { Link } from "react-router-dom";

const ActiveProgramItem = ({ label, value }) => {
    <div>
        <p>{label}</p>
        <p>{value}</p>
    </div>
}

const ActiveProgramContainer = ({ activeProgram }) => {

    const { _id, name, split, trainingDaysPerWeek } = activeProgram;

    if (!_id, !name || !split || !trainingDaysPerWeek) return null;

    return (
        <div className="flex items-center gap-lg">
            <div>
                <Dumbbell />
            </div>

            <div>
                <div>
                    <p className="uppercase">Active program</p>
                    <h5>{name}</h5>
                </div>

                <div>
                    <ActiveProgramItem label='Split Type' value={split} />
                    <ActiveProgramItem label='Training Days / Week' value={trainingDaysPerWeek} />
                </div>
            </div>

            <DefaultButton >
                <Link to={`programs/${_id}`}>View program</Link>
            </DefaultButton>
        </div>
    )
}