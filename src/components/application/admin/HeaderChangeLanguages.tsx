'use client'
import { TypeLang } from '@/module'
import { langSlice } from '@/store/reducer/langSlice'
import { langSelector } from '@/store/selector/langSelector'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import imgEN from '@public/assets/images_copy/en.svg'
import imgVN from '@public/assets/images_copy/vn.svg';
import Image from 'next/image'

interface Props {
}

const HeaderChangeLanguages = (props: Props) => {
    const { dataLang, lang } = useSelector(langSelector)
    
    const dispatch = useDispatch()
    const { changeLang } = langSlice.actions
    const imageForLang = (langStr: string) => {
        switch(langStr) {
            case 'vi':
                return imgVN
            case 'en':
                return imgEN
            default:
                return imgEN
        }
    }
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [ imageLang, setImageLang ] = useState(imageForLang(lang))
    
    console.log(imageLang)
    function switchImgLang(langStr: TypeLang) {

        dispatch(changeLang(langStr))
    }
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <Box className='header-btn-lg'>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title='Change Language'>
                        <IconButton
                            onClick={handleClick}
                            size='small'
                            sx={{ ml: 1 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Image src={imageLang} alt='avatar'></Image>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id='account-menu'
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
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => switchImgLang('en')}>
                        <ListItemIcon>
                            {/* <Avatar src={imgEN} /> */}
                            <Image src={imgEN} alt='English'/>
                        </ListItemIcon>
                        {dataLang.lang.english}
                    </MenuItem>
                    <MenuItem onClick={() => switchImgLang('vi')}>
                        <ListItemIcon>
                            {/* <Avatar src={imgVN} /> */}
                            <Image src={imgVN} alt='Vietnamese'/>
                        </ListItemIcon>
                        {dataLang.lang.vietnam}
                    </MenuItem>
                </Menu>
            </Box>
        </>

    )
}

export default HeaderChangeLanguages