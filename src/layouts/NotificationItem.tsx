import {useState} from "react";
import {NotificationsType} from "@/types/notification";
import {MenuItem} from "@mui/material";

type NotificationProps = {
    notification: NotificationsType,
    handleDropdownClose: () => void
}

const NotificationItem = (props: NotificationProps) => {
    // ** Props
    const { notification, handleDropdownClose } = props

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const optionsOpen = Boolean(anchorEl)

    return (
        <MenuItem>

        </MenuItem>
    )
}
export default NotificationItem;