//React import
import { createContext, useState, ReactNode, useEffect } from "react";

//** MUI import
import { Direction } from "@mui/material";
import { ContentWidth, Mode, Skin, ThemeColor } from "@/types/layout";
import themeConfig from "@/configs/themeConfig";

//** ThemeConfig import */


export type Settings = {
    skin: Skin
    mode: Mode
    direction: Direction
    contentWidth: ContentWidth
    themeColor: ThemeColor
    layout: 'vertical' | 'horizontal'
    toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export type SettingsContextValue = {
    settings: Settings
    saveSettings: (updateSettings : Settings) => void
}

const initialSettings: Settings = {
    skin: themeConfig.skin,
    mode: themeConfig.mode,
    direction: themeConfig.direction,
    contentWidth: themeConfig.contentWidth,
    themeColor: 'primary',
    layout: themeConfig.layout,
    toastPosition: themeConfig.toastPosition
}

//Create Context
export const SettingsContext = createContext<SettingsContextValue>({
    settings: initialSettings,
    saveSettings: () => null
})