import {useState} from "react";
import {useRouter} from "next/navigation";
import {Box, IconButton, Menu, Tooltip, Typography, MenuItem, ListItemIcon} from "@mui/material";
import { FaAlignJustify } from 'react-icons/fa';
import {Logout, Login} from "@mui/icons-material";

type Props = {
    condition?: boolean
}

const HeaderUserBox = (props: Props) => {

    const { condition } = props

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const router = useRouter()
    const [checkLogin, setCheckLogin] = useState(false)

    const open =  Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {

    }

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", position: "relative"}}
                 style={{paddingLeft: '10px', marginLeft: '10px'}}>
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "center"}}>
                    <Typography sx={{
                        mr: 1,
                        opacity: '0.8',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        fontSize: '.88rem',
                    }}>
                        Trang Admin
                    </Typography>
                    {checkLogin && (
                        <Tooltip title="Account setting">
                            <>
                                <IconButton onClick={handleClick}
                                    size="small"
                                    sx={{ml: 0}}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup='true'
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <FaAlignJustify/>
                                </IconButton>
                            </>
                        </Tooltip>
                    )}
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    {checkLogin && (
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize='small' />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    )}
                    {!checkLogin && (
                        <MenuItem onClick={handleLogin}>
                            <ListItemIcon>
                                <Login fontSize='small' />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </>
    )
}
export default HeaderUserBox;