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
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const EllipsisMenu = ({ actions = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const visibleActions = actions.filter(action => !action.hidden);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-end",
        middleware: [
            offset(10),
            flip(),
            shift({ padding: 8 })
        ],
        strategy: "fixed",
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    const menuStyles = `z-50 list-none p-0 m-0 bg-black flex flex-col items-start shadow-2xl divide-y divide-white/50`;
    const listItemStyles = `w-full`;
    const listItemHoverStyle = `transition-colors duration-100 ease-in-out`;
    const buttonStyles = `flex w-full items-center gap-4 py-4 px-6 text-left cursor-pointer whitespace-nowrap`;

    return (
        <>
            <button
                ref={refs.setReference}
                type="button"
                aria-label="Open menu"
                disabled={visibleActions.length === 0}
                className="absolute top-5 right-5"
                {...getReferenceProps({ onClick: (e) => e.stopPropagation() })}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} className="text-black font-bold text-[22px] cursor-pointer" />
            </button>

            {isOpen && visibleActions.length > 0 &&
                (<ul ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={menuStyles}>
                    {visibleActions.map(action => {
                        const isDanger = action.variant === "danger";

                        return (
                            <li
                                key={action.id}
                                className={`${listItemStyles} ${listItemHoverStyle} ${isDanger ? "hover:bg-red-600/10 border-t-red-600" : "hover:bg-white/10"}`}
                            >
                                <button
                                    type="button"
                                    className={`${buttonStyles} ${isDanger ? "text-red-600" : "text-white"}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.onClick();
                                        setIsOpen(false);
                                    }}
                                >
                                    {action.icon && <FontAwesomeIcon icon={action.icon} />}
                                    {action.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>)
            }
        </>
    )
}

export default EllipsisMenu;
