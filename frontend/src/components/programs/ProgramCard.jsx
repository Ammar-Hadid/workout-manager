import EllipsisMenu from "../common/EllipsisMenu.jsx";
import { faPencil, faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"


const ProgramCard = ({ program, openModal, setActive, setSelectedProgram, onDelete }) => {
    const { name, trainingDaysPerWeek, isActive } = program

    // #region menu actions
    const menuActions = [
        {
            id: 'set-active',
            label: "Set as Active",
            icon: faStar,
            hidden: isActive,
            onClick: () => setActive(program._id),
        },
        {
            id: 'edit',
            label: "Edit program",
            icon: faPencil,
            onClick: () => {
                setSelectedProgram(program);
                openModal("edit");
            },
        },
        {
            id: 'delete',
            label: "Remove program",
            icon: faTrashCan,
            variant: "danger",
            onClick: () => onDelete(program._id),
        },
    ]
    // #endregion

    // #region Tailwind classList
    const activeBadgeClassList =
        `absolute 
        -top-5 -left-5 py-2 px-4
        bg-black text-white`;


    const listItemClassList =
        `flex items-center gap-2
        before:content-[''] before:w-4
        before:h-1 before:bg-black`;

    const cardClassList =
        `py-4 px-5 border-4 border-black
        bg-white relative 
        cursor-pointer min-w-0`;
    // #endregion

    return (
        <div className={cardClassList}>
            <EllipsisMenu actions={menuActions} />

            <Link to={`/programs/${program._id}/workouts`} className="flex flex-col gap-4">
                {isActive && <p className={activeBadgeClassList}>Active</p>}

                <h2 className="text-2xl">{name}</h2>
                <ul className="list-none">
                    <li className={listItemClassList}><p><strong>Training days per week: </strong>{trainingDaysPerWeek}</p></li>
                </ul>
            </Link>
        </div>
    )

}

export default ProgramCard;
