'use client'

import {styled} from "@mui/material/styles";
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import React, {Ref} from "react";
import Box from "@mui/material/Box";


const StyleCustomGrid = styled(DataGrid)<DataGridProps> (({theme}) => ({
    ".MuiDataGrid-withBorderColor": {
        outline: "none !important"
    },
    ".MuiDataGrid-selectedRowCount": {
        display: "none"
    },
    ".MuiDataGrid-columnHeaderTitle": {
        textTransform: "capitalize",
        color: theme.palette.primary.main
    }
}))



const CustomDataGrid = React.forwardRef((props: DataGridProps, ref: Ref<any>) => {
    return (
        <Box sx={{ height:"100%", width: "100%", overflow: "auto"}}>
            <StyleCustomGrid {...props}/>
        </Box>
    )
})
export default CustomDataGrid;