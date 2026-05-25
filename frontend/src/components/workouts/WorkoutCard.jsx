import EllipsisMenu from "../common/EllipsisMenu.jsx";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";



export const workoutCard = ({ workout, setSelectedWorkout, openModal, onDelete }) => {
    const { name, order, duration } = workout;

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
        `flex items-center gap-2
        before:content-[''] before:w-4
        before:h-1 before:bg-black`;

    const cardClassList =
        `py-4 px-5 border-4 border-black
        bg-white relative 
        flex flex-col gap-4 
        cursor-pointer min-w-0`;
    // #endregion

    return (
        <div className={cardClassList}>
            <EllipsisMenu actions={menuActions} />

            <h2 className="text-2xl">{name}</h2>
            <ul className="list-none">
                <li className={listItemClassList}>{duration} min</li>
            </ul>
        </div>
    );
}

export default workoutCard;
