"use client"
//** React
import React, {useMemo, useState} from "react";

//** Mui
import {
    Avatar,
    Badge,
    Box,
    Button,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    MenuItemProps,
    Tooltip,
    Typography
} from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';

//** Type
import {ItemOrderProduct} from "@/types/order";
import {formatNumberToLocal} from "@/lib/helperFunction";

//** Component
import NoData from "@/components/customs/no-data";
import IconifyIcon from "@/components/customs/icons";

import { useRouter } from 'next/navigation'
import {WEBSITE_CART, WEBSITE_PRODUCT_DETAILS} from "@/routes/WebsiteRoute";

type TCartProps = {

}

const orderItems = [
    {
        product: 'P001',
        slug: 'iphone-15-pro-max',
        image: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumb-600x600.jpg',
        name: 'iPhone 15 Pro Max 256GB',
        price: 33990000,
        discount: 10,
        amount: 1,
    },
    {
        product: 'P002',
        slug: 'macbook-air-m2-13-inch',
        image: 'https://cdn.tgdd.vn/Products/Images/44/281570/macbook-air-m2-2022-xanh-thumb-600x600.jpg',
        name: 'MacBook Air M2 13 inch 2022',
        price: 28990000,
        discount: 0,
        amount: 1,
    },
]

const StyleMenuItem = styled(MenuItem)<MenuItemProps>(({theme}) => {})

const CartProduct = (props : TCartProps) => {
    //**Hook
    const router = useRouter()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    //** State
    const open = Boolean(anchorEl)

    const totalItemsCart = useMemo(() => {
        const total = orderItems?.reduce((result, current: ItemOrderProduct) => {
            return result + current.amount
        }, 0)
        return total
    }, [orderItems])

    //** Handle function
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
        //console.log(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleNavigateDetailsProduct = (slug: string) => {
        router.push(WEBSITE_PRODUCT_DETAILS(slug));
    }
    const handleNavigateMyCart = () => {
        //console.log("go to cart")
        router.push(WEBSITE_CART);
    }

    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title='My Cart'>
                    <IconButton onClick={handleClick} color='inherit'>
                        {!!orderItems.length ? (
                            <Badge color='primary' badgeContent={totalItemsCart}>
                                <IconifyIcon icon='flowbite:cart-outline'/>
                            </Badge>
                        ) : (
                            <IconifyIcon icon='flowbite:cart-outline'/>
                        )}
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
                            mr: 1
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {orderItems?.length > 0 ? (
                    <>
                        <Box sx={{maxHeight: '400px', overflow: 'auto'}}>
                            {orderItems?.map((item: ItemOrderProduct) => {
                                console.log(item.product)
                                return (
                                    <StyleMenuItem key={item.product}
                                                   onClick={() => handleNavigateDetailsProduct(item.slug)}>
                                        <Avatar src={item.image}
                                                sx={{height: '40px !important', width: '40px !important'}}/>
                                        <Box style={{flex: 1}}>
                                            <Typography
                                                sx={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                {item.name}
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                                    {item.discount > 0 && (
                                                        <Typography
                                                            variant='h6'
                                                            sx={{
                                                                color: theme.palette.error.main,
                                                                fontWeight: 'bold',
                                                                textDecoration: 'line-through',
                                                                fontSize: '10px'
                                                            }}
                                                        >
                                                            {formatNumberToLocal(item.price)} VND
                                                        </Typography>
                                                    )}
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontWeight: 'bold',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        {item.discount > 0 ? (
                                                            <>{formatNumberToLocal((item.price * (100 - item.discount)) / 100)}</>
                                                        ) : (
                                                            <>{formatNumberToLocal(item.price)}</>
                                                        )}{' '}
                                                        VND
                                                    </Typography>
                                                </Box>
                                                <Typography>x <b className="text-xs">{item.amount}</b></Typography>
                                            </Box>
                                        </Box>
                                    </StyleMenuItem>
                                )
                            })}
                        </Box>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                            <Button type='submit' variant='contained' sx={{mt: 3, mb: 2, mr: 2}}
                                    onClick={handleNavigateMyCart}>
                                {('View cart')}
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box sx={{padding: '20px', width: '200px'}}>
                        <NoData widthImage='60px' heightImage='60px' textNodata={('No Product')}/>
                    </Box>
                )}
            </Menu>
        </React.Fragment>
    )
}
export default CartProduct;