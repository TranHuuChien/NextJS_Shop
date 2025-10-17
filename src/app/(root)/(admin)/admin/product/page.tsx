'use client'
import React, {useState} from 'react'
import {PAGE_SIZE_OPTION} from "../category/page";
import {OBJECT_STATUS_PRODUCT} from "@/types/product"
import {GridColDef} from "@mui/x-data-grid";
import { Box, Chip, ChipProps, Grid, Typography, styled, useTheme } from '@mui/material'
import { GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'
import {formatNumberToLocal, formatDate, hexToRGBA} from "@/lib/helperFunction";
import GridEdit from "@/components/customs/grid-edit/index";
import GridDelete from "@/components/customs/grid-delete/index";
import Spinner from "@/components/customs/spinner/index";
import ConfirmationDialog from "@/components/customs/confirm-dialog/index";
import CustomDataGrid from "@/components/customs/grid-data/index";
import {TableHeader} from "@/components/ui/table";
import CustomPagination from "@/components/customs/custom-pagination/index";
import CustomSelect from "@/components/customs/select/index";

const mockData = [
  {
    id: 1,
    name: "MacBook Pro 14-inch",
    type: { id: 1, name: "Laptop" },
    price: 48990000,
    countInStock: 12,
    createdAt: "2025-10-15T08:20:00Z",
    status: true,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    type: { id: 2, name: "Smartphone" },
    price: 29990000,
    countInStock: 5,
    createdAt: "2025-10-10T09:00:00Z",
    status: false,
  },
]

type TProps = {}

const ActiveUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: '#28c76f29',
  color: '#3a843f',
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))

const DeactivateUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: '#da251d29',
  color: '#da251d',
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))


const ListProductPage = ({ children }) => {
  //Variable
  let UPDATE, DELETE: boolean = false;

  //** Theme
  const theme = useTheme()

  const [loading, setLoading] = useState(false)
  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ""
  })
  const [openDeleteProduct, setOpenDeleteProduct] = useState({
    open: false,
    id: ""
  })
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [optionTypes, setOptionTypes] = useState<{ label: string; value: string }[]>([])
  const [selectedRow, setSelectedRow] = useState<string[]>([])
  const [typeSelected, setTypeSelected] = useState<string[]>([])
  const CONSTANT_STATUS_PRODUCT = OBJECT_STATUS_PRODUCT()

  const PaginationComponent = () => {
    return (
        <CustomPagination
            onChangePagination={handleOnChangePagination}
            pageSizeOptions={PAGE_SIZE_OPTION}
            pageSize={pageSize}
            page={page}
            rowLength={50}
        />
    )
  }

  const handleOnChangePagination = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize)
  }

  const handleCloseConfirmDeleteProduct = () => {
    setOpenDeleteProduct({
      open: false,
      id: ''
    })
  }

  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ""
    })
  }

  const handleDeleteProduct = () => {
    //dispatch(deleteProductAsync(openDeleteProduct.id))
  }

  const handleAction = () => {

  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName:"Name",
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>{row?.name}</Typography>
      }
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{row?.type?.name}</Typography>
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params
        return <Typography>{`${formatNumberToLocal(row?.price)} VND`}</Typography>
      }
    },
    {
      field: 'countInStock',
      headerName: 'Count_in_stock',
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.countInStock}</Typography>
      }
    },
    {
      field: 'createdAt',
      headerName: 'Created_date',
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params

        return <Typography>{formatDate(row?.createdAt, { dateStyle: 'short' })}</Typography>
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params

        return (
            <>{row.status ? <ActiveUserStyled label={'Public'} /> : <DeactivateUserStyled label={'Private'} />}</>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      sortable: false,
      align: "center",
      renderCell: params => {
        const { row } = params;
        return (
            <>
              <GridEdit
                  disabled={!UPDATE}
                  onClick={() =>
                      setOpenCreateEdit({
                        open: true,
                        id: String(params.id)
                      })
                  }
              />
              <GridDelete
                  disabled={!DELETE}
                  onClick={() =>
                      setOpenDeleteProduct({
                        open: true,
                        id: String(params.id)
                      })
                  }
              />
            </>
        )
      }
    }
  ]

  const dataListProductStatus = [
    {
      "icon": "la:product-hunt",
      status: "2"
    },
    {
      "icon": "material-symbols-light:public-off",
      status: "0",
    },
    {
      status: "1",
      "icon": "material-symbols-light:public",
    },
  ]
  
  return (
      <>
        {loading && <Spinner/>}
        <ConfirmationDialog
            open={openDeleteProduct.open}
            handleClose={handleCloseConfirmDeleteProduct}
            handleCancel={handleCloseConfirmDeleteProduct}
            handleConfirm={handleDeleteProduct}
            title={'Title_delete_product'}
            description={'Confirm_delete_product'}
        />
        {/*<CreateEditProduct*/}
        {/*    open={openCreateEdit.open}*/}
        {/*    onClose={handleCloseCreateEdit}*/}
        {/*    idProduct={openCreateEdit.id}*/}
        {/*    optionTypes={optionTypes}*/}
        {/*/>*/}

        <Box sx={{ backgroundColor: "inherit", width: '100%', mb: 4 }}>
          <Grid container spacing={6} sx={{ height: '100%' }}>
            {dataListProductStatus?.map((item: any, index: number) => {
              return (
                  <Grid item xs={12} md={4} sm={6} key={index}>
                    {/*<CardCountProduct {...item} countProductStatus={countProductStatus} />*/}
                  </Grid>
              )
            })}
          </Grid>
        </Box>


        <Box sx={{
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              height: '100%',
              width: '100%',
              borderRadius: '15px'
            }}>
          <Grid container sx={{ height: '100%', width: '100%' }}>

            {!selectedRow.length && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}>
                  <Box sx={{ width: "200px" }}>
                    <CustomSelect
                        fullWidth
                        onChange={e => {
                          setTypeSelected(e.target.value as string[])
                        }}
                        multiple
                        options={optionTypes}
                        value={typeSelected}
                        placeholder='Type_product'
                    />
                  </Box>
                </Box>
            )}

            {selectedRow?.length > 0 && (
                <TableHeader
                    numRow={selectedRow?.length}
                    onClear={() => setSelectedRow([])}
                    handleAction={handleAction}
                    actions={[{ label: 'Xóa', value: 'delete', disabled: !DELETE }]}
                />
            )}

            <CustomDataGrid
                rows={mockData}
                columns={columns}
                autoHeight
                sx={{
                  '.row-selected': {
                    backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                    color: `${theme.palette.primary.main} !important`
                  }
                }}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{
                  pagination: PaginationComponent
                }}
                // rowSelectionModel={selectedRow}
                // onRowSelectionModelChange={(row: GridRowSelectionModel) => {
                //   setSelectedRow(row as string[])
                // }}
                sortingOrder={['desc', 'asc']}
                sortingMode='server'
                disableColumnFilter
            />
          </Grid>
        </Box>
      </>
  )
}

export default ListProductPage