"use client"

import React, { useState} from "react";
import {NotificationsType} from "@/types/notification";
import {Badge, Box, IconButton, Menu, MenuItem, MenuItemTitle, MenuItemSubtitle, Typography} from "@mui/material";
import {formatDate} from "@/lib/helperFunction";
import IconifyIcon from "@/components/customs/icons";
import {useRouter} from "next/navigation";
import {NOTIFICATION_DETAIL, WEBSITE_CART} from "@/routes/WebsiteRoute";


type NotificationProps = {
    notification: NotificationsType,
    handleDropdownClose: () => void
}

const NotificationItem = (props: NotificationProps) => {
    // ** Props
    const { notification, handleDropdownClose } = props

    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const router = useRouter()
    const mapTitle = ""

    const optionsOpen = Boolean(anchorEl)

    //** Handle Function
    const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleOptionsClose = () => {
        setAnchorEl(null)
    }

    const handleNavigateDetail = (context: string) => {
        router.push({
            pathname: NOTIFICATION_DETAIL(context),
        }, NOTIFICATION_DETAIL);
    }

    const handleMarkNotification = () => {

    }

    return (
        <MenuItem disableRipple disableTouchRipple>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    <MenuItemTitle
                        onClick={() => handleNavigateDetail(notification.context)}>
                        {(mapTitle as any)[notification.title]}
                    </MenuItemTitle>
                    <MenuItemSubtitle variant='body2'>{notification.body}</MenuItemSubtitle>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {formatDate(notification.createdAt, { dateStyle: 'short' })}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                    {notification.isRead ? (
                        <>
                            <Badge sx={{}} color="success" overlap="circular" variant="dot" />
                            <Typography>Read</Typography>
                        </>
                    ) : (
                        <>
                            <Badge sx={{}} color="error" overlap="circular" variant="dot" />
                            <Typography>{"Unread"}</Typography>
                        </>
                    )}
                    <>
                        <IconButton onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}>
                            <IconifyIcon icon="pepicons-pencil:dots-y"></IconifyIcon>
                        </IconButton>
                        <Menu
                            keepMounted
                            anchorEl={anchorEl}
                            open={optionsOpen}
                            onClose={handleOptionsClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem
                                sx={{ '& svg': { mr: 2 }, border: "none !important" }}
                                onClick={handleMarkNotification}
                            >
                                <IconifyIcon icon='gg:read' fontSize={20} />
                                {'Mark read'}
                            </MenuItem>
                            <MenuItem
                                sx={{ '& svg': { mr: 2 } }}
                                onClick={handleDeleteNotification}
                            >
                                <IconifyIcon icon='mdi:delete-outline' fontSize={20} />
                                {'Delete'}
                            </MenuItem>
                        </Menu>
                    </>
                </Box>
            </Box>
        </MenuItem>
    )
}
export default NotificationItem;