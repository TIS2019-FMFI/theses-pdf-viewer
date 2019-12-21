import {useEffect, useState} from "react";

/**
 * Hook that returns current location (`window.location`).
 * @return {Location}
 */
export const useLocation = () => {
    const [location, setLocation] = useState(window.location);
    const listenToPopstate = () => {
        const winLocation = window.location;
        setLocation(winLocation);
    };
    useEffect(() => {
        window.addEventListener("popstate", listenToPopstate);
        return () => {
            window.removeEventListener("popstate", listenToPopstate);
        };
    }, []);
    return location;
};
