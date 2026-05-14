import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFloating, flip, offset, useClick, useDismiss, useInteractions } from "@floating-ui/react"

const Header = () => {
    const { user, setUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isMenuOpen,
        onOpenChange: setIsMenuOpen,
        placement: "bottom",
        middleware: [
            flip(),
            offset(20)
        ]
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getFloatingProps, getReferenceProps } = useInteractions([click, dismiss])

    return (
        <header className="flex justify-between w-screen p-7 bg-black text-white">
            <button className="font-bold text-1xl">
                <Link to="/">Workout Manager</Link>
            </button>

            <button className="cursor-pointer" ref={refs.setReference} {...getReferenceProps()}>{user?.userName}</button>
            {isMenuOpen &&
                (<ul
                    className="list-none p-2 m-0 flex flex-col gap-3 bg-black text-white border border-b-white"
                    style={floatingStyles}
                    {...getFloatingProps()}
                    ref={refs.setFloating}>

                    <li><Link className="cursor-pointer" to="/programs">Programs</Link></li>
                    <li><button className="text-red-600 font-medium cursor-pointer" onClick={() => setUser(null)}>Logout</button></li>
                </ul>)
            }
        </header>
    )
}

export default Header

