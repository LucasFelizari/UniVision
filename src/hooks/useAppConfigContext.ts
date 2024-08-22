import { useContext } from "react";
import { AppConfigContext } from "../contexts/AppConfigContext";

export function useAppConfigContext() {
    const context = useContext(AppConfigContext);

    return context;
}