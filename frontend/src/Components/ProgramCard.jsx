
const ProgramCard = ({ name, trainingDaysPerWeek, isActive }) => {

    const wrapperClasses =
        `bg-white text-black
        relative
        pt-6 px-4 pb-4
        flex flex-col gap-4`;

    const activeBadgeClasses =
        `absolute 
        -top-2 -left-2 p-2
        bg-black text-white`;


    const listItemStyle =
        `flex items-center gap-2
        before:content-[''] before:w-4
        before:h-2 before:bg-black`


    return (
        <div className={wrapperClasses}>
            {isActive && <p className={activeBadgeClasses}>Active</p>}

            <h2 className="text-2xl">{name}</h2>
            <ul className="list-none">
                <li className={listItemStyle}><p>{trainingDaysPerWeek}</p></li>
            </ul>
        </div>
    )

}

export default ProgramCard;