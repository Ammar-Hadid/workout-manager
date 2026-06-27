import EllipsisMenu from "../../../shared/components/EllipsisMenu.jsx";
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
        `flex items-center gap-sm text-body-sm text-text-secondary
        before:h-2xs before:w-md before:shrink-0 before:rounded-pill
        before:bg-primary before:content-['']`;

    const cardClassList =
        `relative flex min-w-0 flex-col gap-lg
        rounded-card border border-text-secondary/20
        bg-bg-surface-elevated p-lg text-text-primary transition
        hover:border-primary/60 hover:shadow-2xl`;
    // #endregion

    return (
        <div className={cardClassList}>
            <EllipsisMenu actions={menuActions} />

            <h2 className="pr-2xl text-h5 font-semibold">{name}</h2>
            <ul className="flex list-none flex-col gap-sm">
                <li className={listItemClassList}><strong>Muscle group:</strong>{muscleGroup}</li>
                <li className={listItemClassList}><strong>Rest: </strong>{restTime}sec</li>
                <li className={listItemClassList}>{`${sets} x ${minReps} - ${maxReps}`}</li>
            </ul>
        </div>
    )
}

export default ExerciseCard;
