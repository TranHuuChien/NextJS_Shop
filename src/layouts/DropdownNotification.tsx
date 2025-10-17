import {SyntheticEvent, useState} from "react";
import {Badge, Box, Button, Chip, IconButton, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";


const NotificationDropdown = () => {

    // ** Hooks
    const theme = useTheme()

    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
    const [limit, setLimit] = useState(10)

    // ** handle
    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
        setAnchorEl(null)
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
                    <Icon fontSize='1.625rem' icon='tabler:bell' />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
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
                            "Notifications"
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                            <Chip
                                size='small'
                                color='primary'
                                label={`${notifications.totalNew} New`}
                            />
                            <Icon icon="line-md:email-opened"></Icon>
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