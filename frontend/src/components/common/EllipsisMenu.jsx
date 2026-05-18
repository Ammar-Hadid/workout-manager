import { useState } from "react";

import {
    useFloating,
    flip,
    shift,
    offset,
    useInteractions,
    useDismiss,
    useClick,
    autoUpdate
} from "@floating-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faStar, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EllipsisMenu = ({ program, openModal, setSelectedProgram, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-end",
        middleware: [
            offset(40),
            flip(),
            shift({ padding: 8 })
        ],
        strategy: "fixed",
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    // #region Tailwind styles
    const menuStyles = `z-50 list-none p-0 m-0 bg-black flex flex-col items-start shadow-2xl divide-y divide-white/50`;
    const listItemStyles = `w-full`;
    const listItemHoverStyle = `transition-colors duration-100 ease-in-out`;
    const buttonStyles = `flex items-center gap-4 py-4 px-6 text-left cursor-pointer`;
    // #endregion

    return (
        <>
            <button ref={refs.setReference} {...getReferenceProps({ onClick: (e) => e.stopPropagation() },)}>
                <FontAwesomeIcon icon={faEllipsisVertical} className="text-black font-bold text-[22px] absolute top-5 right-5 cursor-pointer" />
            </button>

            {isOpen &&
                (<ul ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={menuStyles}>
                    {!program.isActive &&
                        (<li className={`${listItemStyles} ${listItemHoverStyle} hover:bg-white/10`}>
                            <button className={`${buttonStyles} text-white`}>
                                <FontAwesomeIcon icon={faStar} />
                                Set as Active
                            </button>
                        </li>)
                    }

                    <li className={`${listItemStyles} ${listItemHoverStyle} hover:bg-white/10`}>
                        <button className={`${buttonStyles} text-white`} onClick={() => {
                            openModal("edit");
                            setIsOpen(false);
                            setSelectedProgram(program);
                        }}>
                            <FontAwesomeIcon icon={faPencil} />
                            Edit program
                        </button>
                    </li>

                    <li className={`${listItemStyles} ${listItemHoverStyle} hover:bg-red-600/10 border-t-red-600`}>
                        <button className={`${buttonStyles} text-red-600`} onClick={() => {
                            onDelete(program._id);
                            setIsOpen(false);
                        }}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            Remove program

                        </button>
                    </li>
                </ul>)
            }
        </>
    )
}

export default EllipsisMenu;

