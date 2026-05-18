import EllipsisMenu from "../common/EllipsisMenu.jsx";

const ProgramCard = ({ program, openModal, setActive, setSelectedProgram, onDelete }) => {

    const { id, name, trainingDaysPerWeek, isActive } = program
    const activeBadgeClasses =
        `absolute 
        -top-5 -left-5 py-2 px-4
        bg-black text-white`;


    const listItemStyle =
        `flex items-center gap-2
        before:content-[''] before:w-4
        before:h-1 before:bg-black`


    return (
        <div className="py-4 px-5 border-4 border-black relative flex flex-col gap-4 cursor-pointer min-w-0">
            <EllipsisMenu
                program={program}
                openModal={openModal}
                setSelectedProgram={setSelectedProgram}
                setActive={setActive}
                onDelete={onDelete}
            />
            {isActive && <p className={activeBadgeClasses}>Active</p>}

            <h2 className="text-2xl">{name}</h2>
            <ul className="list-none">
                <li className={listItemStyle}><p><strong>Training days per week: </strong>{trainingDaysPerWeek}</p></li>
            </ul>
        </div>
    )

}

export default ProgramCard;
