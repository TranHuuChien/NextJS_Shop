import { useContext } from "react";
import { SettingsContext, SettingsContextValue } from "@/context/SettingsContexr";

export const useSettings = () : SettingsContextValue => useContext(SettingsContext)
