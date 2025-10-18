"use client"

import {styled, useTheme} from "@mui/material/styles";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {TProduct} from "@/types/product";
import {useRouter} from "next/navigation";
import {formatNumberToLocal, hexToRGBA} from "@/lib/helperFunction";
import IconifyIcon from "@/components/customs/icons";
import {WEBSITE_CART} from "@/routes/WebsiteRoute";

interface TCartProduct {
    item: TProduct
}

const StyleCard = styled(Card)(({theme})=> ({
    position: "relative",
    boxShadow: theme.shadows[4],
    '.MuiCardMedia-root.MuiCardMedia-media': {
        objectFit: 'contain'
    }
}))

const CardProduct = (props: TCartProduct) => {
    const { item } = props;
    //** Hook
    const router = useRouter()
    const theme = useTheme()


    const handleUpdateProductToCart = () => {

    }
    const handleBuyProductToCart = (item: TProduct) => {

        router.push({
            pathname: WEBSITE_CART,
            query: {
                selected: item?._id
            }
        }, WEBSITE_CART)
    }
    return (
        <StyleCard sx={{ width: "100%" }}>
            <CardMedia component='img' height='194' image={item.image} alt='image' />
            <CardContent sx={{ padding: '8px 12px' }}>
                <Typography variant='h5' sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    '-webkitLineClamp': '2',
                    '-webkitBoxOrient': 'vertical',
                    minHeight: '48px',
                    mb: 2
                }}>
                    {item.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {item.discount > 0 && (
                        <Typography
                            variant='h6'
                            sx={{
                                color: theme.palette.error.main,
                                fontWeight: 'bold',
                                textDecoration: 'line-through',
                                fontSize: '14px'
                            }}
                        >
                            {formatNumberToLocal(item.price)} VND
                        </Typography>
                    )}

                    <Typography variant='h4'
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}>
                        {item.discount > 0 ? (
                            <>{formatNumberToLocal((item.price * (100 - item.discount)) / 100)}</>
                        ) : (
                            <>{formatNumberToLocal(item.price)}</>
                        )}{' '}
                        VND
                    </Typography>

                    {item.discount > 0 && (
                        <Box
                            sx={{
                                backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                                width: '36px',
                                height: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '2px'
                            }}>
                            <Typography variant='h6'
                                sx={{
                                    color: theme.palette.error.main,
                                    fontSize: '10px',
                                    whiteSpace: 'nowrap'
                                }}>
                                - {item.discount} %
                            </Typography>
                        </Box>
                    )}
                </Box>

                {item.countInStock > 0 ? (
                    <Typography variant='body2' color='text.secondary' sx={{ my: 1 }}>
                        <>Count_in_stock</> <b>{item.countInStock}</b> <>{'Product'}</>
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            backgroundColor: hexToRGBA(theme.palette.error.main, 0.42),
                            width: '60px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2px',
                            my: 1
                        }}>
                        <Typography
                            variant='h6'
                            sx={{
                                color: theme.palette.error.main,
                                fontSize: '12px',
                                whiteSpace: 'nowrap'
                            }}>
                            Hết hàng
                        </Typography>
                    </Box>
                )}

                {item.sold ? (
                    <Typography variant='body2' color='text.secondary'>
                        <>{'Sold product'}</> <b>{item.sold}</b> <>{'Product'}</>
                    </Typography>
                ) : (
                    <Typography variant='body2' color='text.secondary'>
                        {'No sell product'}
                    </Typography>
                )}

                {(item?.location?.name || item.views) && (
                    <Box sx={{display: "flex", alignItems: "center", gap: "10px", mt: 2}}>
                        {item?.location?.name && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <IconifyIcon icon='carbon:location' />

                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}
                                >
                                    {item?.location?.name}
                                </Typography>
                            </Box>
                        )}
                        {item?.views && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <IconifyIcon icon='lets-icons:view-light' />

                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}
                                >
                                    {item?.views}
                                </Typography>
                            </Box>
                        )}
                        {!!item?.uniqueViews?.length && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <IconifyIcon icon='mdi:account-view-outline' />
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}
                                >
                                    {item?.uniqueViews?.length}
                                </Typography>
                            </Box>
                        )}
                        {!!item?.likedBy?.length && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <IconifyIcon icon='icon-park-outline:like' />
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}
                                >
                                    {item?.likedBy?.length}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </CardContent>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 12px 10px', gap: 2 }}>
                <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontWeight: 'bold'
                    }}
                    disabled={item.countInStock < 1}
                    onClick={() => handleUpdateProductToCart(item)}
                >
                    <IconifyIcon icon='bx:cart' fontSize={24} style={{ position: 'relative', top: '-2px' }} />
                    {'Add_to_cart'}
                </Button>
                <Button
                    fullWidth
                    variant='contained'
                    sx={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontWeight: 'bold'
                    }}
                    disabled={item.countInStock < 1}
                    onClick={() => handleBuyProductToCart(item)}
                >
                    <IconifyIcon icon='icon-park-outline:buy' fontSize={20} style={{ position: 'relative', top: '-2px' }} />
                    {'Buy_now'}
                </Button>
            </Box>
        </StyleCard>
    )
}
export default CardProduct;