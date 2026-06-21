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
        left-lg top-lg rounded-pill
        bg-success-200 px-md py-xs
        text-body-sm font-semibold text-success`;


    const listItemClassList =
        `flex items-center gap-sm text-body-sm text-text-secondary
        before:h-2xs before:w-md before:rounded-pill
        before:bg-primary before:content-['']`;

    const cardClassList =
        `relative min-w-0 cursor-pointer rounded-card
        border border-text-secondary/20 bg-bg-surface-elevated
        p-lg text-text-primary transition
        hover:border-primary/60 hover:shadow-2xl`;
    // #endregion

    return (
        <div className={cardClassList}>
            <EllipsisMenu actions={menuActions} />

            <Link to={`/programs/${program._id}/workouts`} className={`flex flex-col gap-lg ${isActive ? "pt-2xl" : ""}`}>
                {isActive && <p className={activeBadgeClassList}>Active</p>}

                <h2 className="pr-2xl text-h5 font-semibold">{name}</h2>
                <ul className="list-none">
                    <li className={listItemClassList}><p><strong>Training days per week: </strong>{trainingDaysPerWeek}</p></li>
                </ul>
            </Link>
        </div>
    )

}

export default ProgramCard;
