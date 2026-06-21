import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
    useFloating,
    flip,
    shift,
    offset,
    useClick,
    useDismiss,
    useInteractions,
    autoUpdate
} from "@floating-ui/react"

const Header = () => {
    const { user, setUser } = useAuth();

    // #region menu logic
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isMenuOpen,
        onOpenChange: setIsMenuOpen,
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

    const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss]);
    // #endregion


    const listItemClassList = `cursor-pointer px-lg py-md text-body-sm transition-colors duration-75 ease-in-out hover:bg-primary/10`
    return (
        <header className="relative z-50 flex w-full items-center justify-between border-b border-text-secondary/20 bg-bg-surface px-lg py-lg text-text-primary md:px-4xl lg:px-5xl">
            <button className="font-display text-h5 font-bold">
                <Link to="/">Workout Manager</Link>
            </button>

            <button className="cursor-pointer rounded-pill border border-text-secondary/30 px-lg py-sm text-body-sm text-text-secondary transition hover:border-primary hover:text-text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20" ref={refs.setReference} {...getReferenceProps()}>{user?.userName}</button>
            {isMenuOpen &&
                (<ul
                    className="z-50 m-0 flex list-none flex-col gap-2xs rounded-card border overflow-hidden border-text-secondary/20 bg-bg-surface-elevated text-text-primary shadow-2xl"
                    style={floatingStyles}
                    {...getFloatingProps()}
                    ref={refs.setFloating}>

                    <li className={listItemClassList}>
                        <Link to="/programs" onClick={() => setIsMenuOpen(false)}>
                            Programs
                        </Link>
                    </li>

                    <li className={listItemClassList}>
                        <button className="cursor-pointer font-medium text-danger" onClick={() => setUser(null)}>
                            Logout
                        </button>
                    </li>
                </ul>)
            }
        </header>
    )
}

export default Header
