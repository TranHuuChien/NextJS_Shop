//**MUI import */
import { ContentWidth, Mode, Skin } from "@/types/layout";
import { Direction } from "@mui/material";

//**Types */


type ThemeConfig = {
    templateName: string
    skin: Skin
    mode: Mode
    direction: Direction
    contentWidth: ContentWidth
    layout: 'vertical' | 'horizontal'
    toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

const themeConfig : ThemeConfig = {
    templateName: 'ChienShop',
    skin: 'default',
    mode: 'light' as Mode,
    direction: 'ltr',
    layout: 'vertical',
    contentWidth: 'boxed',
    toastPosition: 'top-left'
}

export default themeConfig