import EllipsisMenu from "../common/EllipsisMenu.jsx";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";



export const workoutCard = ({ workout, setSelectedWorkout, openModal, onDelete }) => {
    const { name, duration } = workout;

    // #region menu actions
    const menuActions = [
        {
            id: 'edit',
            label: 'Edit workout',
            icon: faPencil,
            onClick: () => {
                setSelectedWorkout(workout);
                openModal("edit");
            },
        },

        {
            id: 'delete',
            label: 'Delete workout',
            icon: faTrashCan,
            variant: 'danger',
            onClick: () => onDelete(workout._id),
        },
    ]
    // #endregion

    // #region Tailwind classlist
    const listItemClassList =
        `flex items-center gap-sm text-body-sm text-text-secondary
        before:h-2xs before:w-md before:rounded-pill
        before:bg-primary before:content-['']`;

    const cardClassList =
        `relative flex min-w-0 cursor-pointer flex-col gap-lg
        rounded-card border border-text-secondary/20
        bg-bg-surface-elevated p-lg text-text-primary transition
        hover:border-primary/60 hover:shadow-2xl`;
    // #endregion

    return (
        <div className={cardClassList}>
            <EllipsisMenu actions={menuActions} />

            <Link to={`${workout._id}/exercises`} className="flex flex-col gap-md">
                <h2 className="pr-2xl text-h5 font-semibold">{name}</h2>
                <ul className="list-none">
                    <li className={listItemClassList}>{duration} min</li>
                </ul>
            </Link>
        </div>
    );
}

export default workoutCard;
