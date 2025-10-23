"use client"
// ** Next
import Link from 'next/link'
import { useState } from "react"

// ** Components
import {ItemOrderProduct} from "@/types/product";

// ** Mui
import {Box, Chip, ChipProps, Grid, Typography, styled, useTheme, Checkbox, Avatar} from '@mui/material'

//** Help function
import {formatNumberToLocal} from "@/lib/helperFunction";
import {hexToRGBA} from "../../../../lib/helperFunction";

type ItemCartProps = {
    item: ItemOrderProduct,
    index: number,
    selectedRow: string[],
    handleChangeCheckBox: (value: string) => void
}

interface TItemOrderProductState extends ItemOrderProduct {
    countInStock?: number
}

const ItemCartProduct = ({ item, index, selectedRows, handleChangeCheckbox }: ItemCartProps) => {

    //**State
    const [itemState, setItemState] = useState<TItemOrderProductState>(item)

    //** Hook
    const theme = useTheme()
    //

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap:"8px" }}>
                <Box sx={{ width: "calc(10% - 100px)"}}>
                    <Checkbox
                        disabled={!itemState?.countInStock}
                        checked={selectedRows.includes(itemState?.product)}
                        value={itemState?.product}
                        onChange={e => {
                            handleChangeCheckbox(e.target.value)
                        }}
                    />
                </Box>
                <Avatar sx={{ width: '100px', height: '100px' }} src={itemState.image} />
                <Typography
                    sx={{
                        fontSize: '20px',
                        flexBasis: '35%',
                        maxWidth: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: 'block',
                        mt: 2,
                    }}>
                    <Link style={{color: "inherit"}} href={`/product/${itemState.slug}`}>{itemState.name}</Link>
                </Typography>
                <Box sx={{ flexBasis: '20%' }}>
                    <Typography
                        variant='h6'
                        mt={2}
                        sx={{
                            color: itemState.discount > 0 ? theme.palette.error.main : theme.palette.primary.main,
                            fontWeight: 'bold',
                            textDecoration: itemState.discount > 0 ? 'line-through' : 'normal',
                            fontSize: '18px'
                        }}>
                        {formatNumberToLocal(itemState.price)} VND
                    </Typography>
                </Box>

                <Box sx={{ flexBasis: '20%', display: 'flex', alignItems: 'center', gap: 1 }}>
                    {itemState.discount > 0 && (
                        <Typography
                            variant='h4'
                            mt={2}
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>
                            {formatNumberToLocal((itemState.price * (100 - itemState.discount)) / 100)}
                        </Typography>
                    )}
                    {itemState.discount > 0 && (
                        <Box sx={{
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
                                }}> - {itemState.discount} %
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
export default ItemCartProduct