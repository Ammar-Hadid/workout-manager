import { useState } from "react";
import { useRouteLoaderData, useNavigate, useMatches } from "react-router-dom";
import {
    useFloating,
    flip,
    shift,
    offset,
    useClick,
    useDismiss,
    useInteractions,
    autoUpdate
} from "@floating-ui/react";

import { logout } from "../../features/auth/api/auth.api.js";

import { useToast } from "../context/toastContext.jsx";
import { getErrorMessage } from "../utils/errorHelper.js";

import { LogOut, User } from "lucide-react";

const Header = () => {
    const { user } = useRouteLoaderData('root');
    const navigate = useNavigate();

    const { showToast } = useToast();



    const matches = useMatches();
    const currentMatch = matches.at(-1);

    const title = currentMatch?.handle?.getTitle?.(user) ?? currentMatch.handle?.title;

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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
        }

        catch (error) {
            showToast(getErrorMessage(error));
        }
    }

    const listItemClassList = `cursor-pointer px-lg py-md text-body-sm transition-colors duration-75 ease-in-out hover:bg-primary/10`
    return (
        <header className="relative z-50 flex w-full items-center pl-lg justify-between py-lg text-text-primary">
            <p className="font-body text-body font-medium">
                {title}
            </p>

            <button className="flex items-center gap-md cursor-pointer rounded-pill border border-text-secondary/30 px-lg py-sm text-body-sm text-text-secondary transition hover:border-primary hover:text-text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20" ref={(node) => {
                refs.setReference(node);
            }} {...getReferenceProps()}
            >
                <User />
                {user?.userName}
            </button>
            {isMenuOpen && (
                <>
                    <ul
                        className="z-50 m-0 flex list-none flex-col gap-2xs rounded-lg border overflow-hidden border-text-secondary/20 bg-bg-surface-elevated text-text-primary shadow-2xl"
                        style={floatingStyles}
                        {...getFloatingProps()}
                        ref={(node) => {
                            refs.setFloating(node);
                        }}>

                        <li className={listItemClassList}>
                            <button className="flex items-center gap-md cursor-pointer font-medium text-danger" onClick={handleLogout} >
                                <LogOut />
                                Logout
                            </button>
                        </li>
                    </ul>
                </>
            )}
        </header>
    )
}

export default Header
