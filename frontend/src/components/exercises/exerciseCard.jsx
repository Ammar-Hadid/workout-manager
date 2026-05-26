import EllipsisMenu from "../common/EllipsisMenu.jsx";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ExerciseCard = ({ exercise, setSelectedExercise, openModal, onDelete }) => {
    const { name, muscleGroup, restTime, sets, minReps, maxReps } = exercise;
    // #region Menuactions
    const menuActions = [
        {
            id: 'edit',
            label: 'Edit exercise',
            icon: faPencil,
            onClick: () => {
                setSelectedExercise(exercise);
                openModal("edit")
            },
        },

        {
            id: 'delete',
            label: 'Delete exercise',
            icon: faTrashCan,
            variant: 'danger',
            onClick: () => onDelete(exercise._id)
        }
    ]
    // #endregion

    // #region Tailwind classlist
    const listItemClassList =
        `flex items-center gap-2
        before:content-[''] before:w-4
        before:h-1 before:bg-black`;

    const cardClassList =
        `py-4 px-5 border-4 border-black
        bg-white relative 
        flex flex-col gap-4 
        min-w-0`;
    // #endregion

    return (
        <div className={cardClassList}>
            <EllipsisMenu actions={menuActions} />

            <h2 className="text-2xl">{name}</h2>
            <ul className="list-none">
                <li className={listItemClassList}><strong>Muscle group:</strong>{muscleGroup}</li>
                <li className={listItemClassList}><strong>Rest: </strong>{restTime}sec</li>
                <li className={listItemClassList}>{`${sets} x ${minReps} - ${maxReps}`}</li>
            </ul>
        </div>
    )
}

export default ExerciseCard;