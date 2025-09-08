'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useMaterialReactTable, MaterialReactTable, MRT_ToggleGlobalFilterButton, MRT_ShowHideColumnsMenu, MRT_ShowHideColumnsButton, MRT_ToggleFullScreenButton, MRT_ToggleDensePaddingButton } from 'material-react-table';
import { original } from '@reduxjs/toolkit';
import { Tooltip } from '@/components/ui/tooltip';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import RecyclingIcon from '@mui/icons-material/Recycling'
import DeleteIcon from '@mui/icons-material/Delete'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const Datatable = ({
    queryKey,
    fetchUrl,
    columnsConfig,
    initialPageSize = 10,
    exportEndpoint,
    deleteEndpoint,
    deleteType,
    trashView,
    createAction
}) => {
    //Filter and soring state
    const [rowSelection, setRowSelection] = useState()
    const [columnFilters, setColumnFiters] = useState(false)
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize
    })

    //handle delete method
    //const deleteMutation = useDeleteMutation()
    const handleDelete = () => {
        let c = true
        if(deleteType == 'PD') {
            c = confirm('Are you sure you want to delete the data permanently?')
        } else {
            c = confirm('Are you sure you want to move data into trash?')
        }
        if(c) {
            //deleteMutation.mutate()
        }
    }

   

    // Fetch data filter
    const {
        data: { data: [], meta } = {},
        isError,
        isRefetching,
        isLoading
    } = useQuery({
        queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`)
            url.searchParams.set('size', `${pagination.pageSize}`)
            url.searchParams.set('filter', JSON.stringify(columnFilters ?? []))
            url.searchParams.set('globalFilter', globalFilter ?? '')
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []))

            const { data: response } = await axios.get(url.href)
            return response;
        },
        placeholderData: keepPreviousData
    })

    //init table data
    const table = useMaterialReactTable({
        columns: columnsConfig,
        data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data'
            } : undefined,
        onColumnFiltersChange: setColumnFiters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount: data?.meta.totalRowCount ?? 0,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection,

        },

        getRowId: (originalRow) => originalRow._id,

        renderToolbarInternalActions: ({ table }) => (
            <>
                {/*built in button*/}
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />

                {deleteType !== 'PD'
                    && <Tooltip title="Recycle Bin">
                        <Link href={trashView}>
                            <IconButton>
                                <RecyclingIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                }

                {deleteType === 'SD'
                    && <Tooltip title="Delete All">
                        <IconButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                            onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }

                {deleteType === 'PD'
                    &&
                    <>
                        <Tooltip title="Restore Data">
                            <IconButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                onClick={() => handleDelete(Object.keys(rowSelection), 'RSD')}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>
                         <Tooltip title="Restore Delete Data">
                            <IconButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                                onClick={() => handleDelete()}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            </>
        )
    })

    return (
        <div>Datatable</div>
    )
}

export default Datatable