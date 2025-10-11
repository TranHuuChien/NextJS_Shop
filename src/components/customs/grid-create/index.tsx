'use client'

//**
import {IconButton, Tooltip, useTheme} from "@mui/material";
import {Icon} from "lucide-react";

interface TGridCreate {
    onClick: () => void
    disable?: boolean
}

const GridCreate = (props: TGridCreate) => {
    const theme = useTheme()
    return (
        <Tooltip title='Create'>
            <IconButton sx={{ backgroundColor: `${theme.palette.primary.main} !important`,
                color: `${theme.palette.common.white}`}}>
                <Icon icon='ic:round-plus' />
            </IconButton>
        </Tooltip>
    )
}
export default GridCreate;