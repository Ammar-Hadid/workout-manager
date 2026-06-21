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

    const menuStyles = `z-50 m-0 flex list-none flex-col items-start divide-y divide-text-secondary/20 overflow-hidden rounded-card border border-text-secondary/20 bg-bg-surface-elevated overflow-hidden shadow-2xl`;
    const listItemStyles = `w-full`;
    const listItemHoverStyle = `transition-colors duration-100 ease-in-out`;
    const buttonStyles = `flex w-full cursor-pointer items-center gap-md whitespace-nowrap px-lg py-md text-left text-body-sm`;

    return (
        <>
            <button
                ref={(node) => {
                    refs.setReference(node);
                }}
                type="button"
                aria-label="Open menu"
                disabled={visibleActions.length === 0}
                className="absolute right-lg top-lg rounded-pill p-sm text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
                {...getReferenceProps({ onClick: (e) => e.stopPropagation() })}
            >
                <FontAwesomeIcon icon={faEllipsisVertical} className="cursor-pointer text-body-lg font-bold" />
            </button>

            {isOpen && visibleActions.length > 0 && (
                <>
                    <ul
                        ref={(node) => {
                            refs.setFloating(node);
                        }}
                        style={floatingStyles}
                        {...getFloatingProps()}
                        className={menuStyles}
                    >
                        {visibleActions.map(action => {
                            const isDanger = action.variant === "danger";

                            return (
                                <li
                                    key={action.id}
                                    className={`${listItemStyles} ${listItemHoverStyle}`}
                                >
                                    <button
                                        type="button"
                                        className={`${buttonStyles} ${isDanger ? "text-danger hover:bg-danger-200" : "text-text-primary hover:bg-primary/10"}`}
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
                    </ul>
                </>
            )}
        </>
    )
}

export default EllipsisMenu;
