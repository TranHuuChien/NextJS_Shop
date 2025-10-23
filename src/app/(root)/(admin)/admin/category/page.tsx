'use client'

 import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from '@/routes/AdminPanelRoute'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import CustomDataGrid from "@/components/customs/data-grid/index";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import {AvatarGroup, Chip, ChipProps, Typography} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import GridEdit from "@/components/customs/grid-edit/index";
import GridDelete from "@/components/customs/grid-delete/index";
import CustomPagination from "@/components/customs/custom-pagination/index";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_CATEGORY_SHOW, label: 'Category' }
]

interface StatusOrderChipT extends ChipProps {
    background: string
}

type TSelectedRow = {
    row: string
}



const OrderStatusStyled = styled(Chip)<StatusOrderChipT>(({ theme, background }) => ({
    backgroundColor: background,
    color: theme.palette.common.white,
    fontSize: '14px',
    padding: '8px 4px',
    fontWeight: 400
}))


//  async function getData(): Promise<CATEGORY_TYPE[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       name: "The Thao",
//       slug: "the-thao",
//       createDate: '10-12-2025'
//     },
//     // ...
//   ]
// }

export const PAGE_SIZE_OPTION = [10, 20, 30, 40, 50]

const ShowCategory = () => {
    //** State
    const [openEdit, setOpenEdit] = useState({
        open: false,
        id: ''
    })
    const [openDelete, setOpenDetele] = useState({
        open: false,
        id: ''
    })

    const [sortBy, setSortBy] = useState("createdAt desc")
    const [searchBy, setSearchBy] =useState("")
    const [statusSelected, setStatusSelected] = useState<string[]>([])

    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
    const [page, setPage] = useState(1)
    const [selectedRow, setSelectedRow] = useState<TSelectedRow[]>([])

    const handleCloseEdit = () => {
        setOpenEdit({
            open: false,
            id: ''
        })
    }
    const handleCloseDelete = () => {
        setOpenDetele({
            open: false,
            id: ""
        })
    }

    //** Theme
    const theme = useTheme()
    const STATUS_ORDER_PRODUCT_STYLE = {
        0: {
            label: "Wait_payment",
            background: theme.palette.warning.main
        },
        1: {
            label: "Wait_delivery",
            background: theme.palette.secondary.main
        },
        2: {
            label: "Done_order",
            background: theme.palette.success.main
        },
        3: {
            label: "Cancel_order",
            background: theme.palette.error.main
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'items',
            headerName: "Product Item",
            flex: 1,
            minWidth: 200,
            // renderCell: params => {
            //     const { row } = params
            //
            //     return (
            //         <AvatarGroup max={1}>
            //             {row.orderItems?.map((item: TItemProductMe) => {
            //                 return (
            //                     <Avatar key={item?.product?._id} alt={item?.product?.slug} src={item?.image} />
            //                 )
            //             })}
            //         </AvatarGroup>
            //     )
            // }
        },
        {
            field: "category_name",
            headerName: "Category Name",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: params => {
                const { row } = params
                return <Typography></Typography>
            }
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            maxWidth: 150,
            renderCell: params => {
                const { row } = params
                return (
                    <>
                        {<OrderStatusStyled background={(STATUS_ORDER_PRODUCT_STYLE as any)[row.status]?.background} label={(STATUS_ORDER_PRODUCT_STYLE as any)[row.status]?.label} />}
                    </>
                )

            }
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 180,
            sortable: false,
            align: "left",
            renderCell: params => {
                const { row } = params
                return (
                    <>
                        <GridEdit
                            disabled={true}
                            onClick={() => {
                                setOpenEdit({
                                    open: true,
                                    id: String(params.id)
                                })
                            }}
                        />
                        <GridDelete
                            disabled={true}
                            onClick={() => {
                               setOpenDetele({
                                   open: true,
                                   id: String(params.id)
                               })
                            }}
                        />
                    </>
                )
            }
        }
    ]

    const handleOnchangePagination = (page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const PaginationComponent = () => {
        console.log(page, pageSize)
        return (
            <CustomPagination
                onChangePagination={handleOnchangePagination}
                pageSizeOptions={PAGE_SIZE_OPTION}
                pageSize={pageSize}
                page={page}
                rowLength={50}
            />
        )
    }

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />

      <Card className='py-0 rounded shadow-sm'>
        <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
          <div className='flex justify-between items-center'>
            <h4 className='text-xl font-semibold'>Show Category</h4>
            <Button >
              <FiPlus />
              <Link href={ADMIN_CATEGORY_ADD}>New Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className='pb-5'>
          {/* <DatatableWrapper
            queryKey='category-data'
            fetchUrl='/api/category'
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint='/api/category/export'
            deleteEndpoint='/api/category/delete'
            deleteType='SD'
            trashView={`${ADMIN_TRASH}?trashof=category`}
            createAction={action}
          /> */}
            <CustomDataGrid
                columns={columns}
                autoHeight
                sorting={['desc', 'asc']}
                sortingMode='server'
                slots={{
                    pagination: PaginationComponent
                }}
            />

          {/*<DataTable columns={DT_CATEGORY_COLUMN} data={data}/>*/}
        </CardContent>
      </Card> 
    </div>
  )
}

export default ShowCategory