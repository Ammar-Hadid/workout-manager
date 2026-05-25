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
            offset(40),
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


    const listItemClassList = `py-4 px-7 cursor-pointer hover:bg-red-200/20 transition-colors duration-75 ease-in-out`
    return (
        <header className="relative z-50 flex justify-between w-full py-8 px-20 bg-black text-white">
            <button className="font-bold text-1xl">
                <Link to="/">Workout Manager</Link>
            </button>

            <button className="cursor-pointer" ref={refs.setReference} {...getReferenceProps()}>{user?.userName}</button>
            {isMenuOpen &&
                (<ul
                    className="z-50 list-none m-0 flex flex-col bg-black text-white divide-y divide-white/50"
                    style={floatingStyles}
                    {...getFloatingProps()}
                    ref={refs.setFloating}>

                    <li className={listItemClassList}>
                        <Link to="/programs" onClick={() => setIsMenuOpen(false)}>
                            Programs
                        </Link>
                    </li>

                    <li className={listItemClassList}>
                        <button className="text-red-600 font-medium cursor-pointer" onClick={() => setUser(null)}>
                            Logout
                        </button>
                    </li>
                </ul>)
            }
        </header>
    )
}

export default Header
