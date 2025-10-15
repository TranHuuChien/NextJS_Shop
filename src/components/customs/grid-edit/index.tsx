//** Mui
import IconifyIcon from '@/components/customs/icons'
import {IconButton, Tooltip} from "@mui/material";

interface TGridEdit {
    onClick: () => void,
    disabled?: boolean
}

const GridEdit = (props: TGridEdit) => {
    const { onClick, disabled } = props
    return (
        <Tooltip title='Edit'>
            <IconButton onClick={onClick} disabled={disabled}>
                <IconifyIcon icon='tabler:edit' />
            </IconButton>
        </Tooltip>
    )
}
export default GridEdit;