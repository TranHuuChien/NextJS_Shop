import {SyntheticEvent, useState, Fragment } from "react";
import {Badge, Box, Button, Chip, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {NotificationsType} from "@/types/notification";
import NotificationItem from "@/layouts/NotificationItem";
import IconifyIcon from "@/components/customs/icons";



const NotificationDropdown = () => {

    const notifications = {
        data : [
            {
                _id: "1",
                title: "Cập nhật hệ thống",
                body: "Hệ thống sẽ bảo trì vào lúc 23:00 tối nay.",
                isRead: false,
                referenceId: "sys_001",
                context: "system",
                createdAt: "2025-10-23T09:15:00Z",
            },
            {
                _id: "2",
                title: "Đơn hàng #12345 đã được xác nhận",
                body: "Đơn hàng của bạn đang được chuẩn bị giao.",
                isRead: true,
                referenceId: "order_12345",
                context: "order",
                createdAt: "2025-10-22T14:30:00Z",
            },
        ],
        totalNew: 3
    }

    // ** Hooks
    const theme = useTheme()

    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
    const [limit, setLimit] = useState(10)

    // **
    const open = Boolean(anchorEl)

    // ** handle
    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
        setAnchorEl(null)
    }

    const handleScrollListNotification = () => {

    }

    const wrapperListRef = () => {

    }

    const handleMarkReadAllNotification = () => {
        // ** call api get all noti depend on user

    }

    return (
        <Fragment>
            <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
                <Badge
                    color='error'
                    badgeContent={notifications.totalNew}
                    sx={{
                        '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
                    }}>
                    <IconifyIcon fontSize='1.625rem' icon='tabler:bell' />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleDropdownClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography variant='h5' sx={{ cursor: 'text' }}>
                            Notifications
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <Chip
                                size='small'
                                color='primary'
                                label={`${notifications.totalNew} New`}
                            />
                            <IconifyIcon icon="line-md:email-opened"></IconifyIcon>
                        </Box>
                    </Box>
                </MenuItem>
                <Box
                    sx={{
                        maxHeight: 349, overflowY: 'auto', overflowX: 'hidden'
                    }}
                    ref={wrapperListRef}
                    onScroll={handleScrollListNotification}
                >
                    {notifications?.data?.map((notification: NotificationsType, index: number) => (
                        <NotificationItem
                            key={index}
                            notification={notification}
                            handleDropdownClose={handleDropdownClose}
                        />
                    ))}
                </Box>
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{
                        borderBottom: 0,
                        cursor: 'default',
                        userSelect: 'auto',
                        backgroundColor: `${theme.palette.background.paper} !important`,
                        borderTop: theme => `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Button fullWidth variant='contained' onClick={handleMarkReadAllNotification}>
                        Mark read all notifications
                    </Button>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}
export default NotificationDropdown;