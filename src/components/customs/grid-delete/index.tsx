import IconifyIcon from '@/components/customs/icons'
import { IconButton, Tooltip } from '@mui/material'

interface TGridDelete {
    onClick: () => void,
    disabled?: boolean
}

const GridDelete = (props: TGridDelete) => {
    // Props
    const { onClick, disabled } = props

    return (
        <Tooltip title='Delete'>
            <IconButton onClick={onClick} disabled={disabled}>
                <IconifyIcon icon='mdi:delete-outline' />
            </IconButton>
        </Tooltip>
    )
}
export default GridDelete;