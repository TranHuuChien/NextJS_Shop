'use client'

import React, {Ref} from "react";
import {styled} from "@mui/material/styles";
import {Box, MenuItem, Pagination, PaginationProps, Select} from "@mui/material";

type PaginationProps = {

}

const StyledPagination = styled(Pagination)<PaginationProps> (({theme}) => ({
    '& .MuiDataGrid-footerContainer': {
        '.MuiBox-root': {
            flex: 1,
            width: '100% !important'
        }
    },
}))


const CustomPagination = React.forwardRef((props: PaginationProps, ref: Ref<any>) => {
    const { pageSize, page, rowLength, pageSizeOptions, onChangePagination, isHideShowed, ...rests } = props

    return (
        <Box sx={{display: "flex", alignItems: "center",
            justifyContent: isHideShowed ? "center" : "space-between",
            width: "100%", padding: "8px"
        }}>
            {!isHideShowed ? (
                <>
                    {rowLength > 0 ? (
                        <Box>
                            <span>Đang hiển thị </span>
                            <span style={{ fontWeight: 'bold' }}>
                                {page === 1 ? page : 1 + pageSize * (page - 1)}
                                {' - '}
                            </span>
                            <span style={{ fontWeight: 'bold' }}>{page * pageSize < rowLength ? page * pageSize : rowLength} </span>
                            <span>trên </span>
                            <span style={{ fontWeight: 'bold' }}>{rowLength}</span>
                        </Box>
                    ) : (<Box></Box>)}
                </>
            ) : (<Box></Box>)}

            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {!isHideShowed && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span>Số trang</span>
                        <Select size={"small"} sx={{
                            width: '80px',
                            padding: 0,
                            '& .MuiSelect-select.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall':
                                { minWidth: 'unset !important', padding: '8.5px 12px 8.5px 24px !important' }
                        }}
                            value={pageSize}
                            onChange={(e) => onChangePagination(1, +e.target.value)}
                        >
                            {pageSizeOptions.map((pageOpt, index) => {
                                return (
                                    <MenuItem value={pageOpt} key={index}>
                                        {pageOpt}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                )}

                <StyledPagination onChange={(e, page: number) => {
                    onChangePagination(page, pageSize)}}
                    color='primary' page={page} count={Math.ceil(rowLength / pageSize)} {...rests} />
            </Box>
        </Box>
    )
})
//// eslint-disable-next-line react/display-name
CustomPagination.displayName= 'CustomPagination' // tranh eslint an danh
export default CustomPagination;
