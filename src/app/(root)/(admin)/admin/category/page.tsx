'use client'

import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
 import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from '@/routes/AdminPanelRoute'
import Link from 'next/link'
import { FiPlus } from 'react-icons/fi'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
//import DatatableWrapper from '@/components/Application/Admin/DatatableWrapper'
import { DT_CATEGORY_COLUMN } from '@/lib/column'
import { columnConfig } from '@/lib/helperFunction'
// import DeleteAction from '@/components/Application/Admin/DeleteAction'
// import EditAction from '@/components/Application/Admin/EditAction'
import { DataTable } from '@/components/application/admin/DataTable'
import { CATEGORY_TYPE } from '@/lib/column'

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_CATEGORY_SHOW, label: 'Category' }
]

 async function getData(): Promise<CATEGORY_TYPE[]> {
  // Fetch data from your API here.
  return [
    {
      name: "The Thao",
      slug: "the-thao",
      createDate: '10-12-2025'
    },
    // ...
  ]
}

const ShowCategory = () => {

  // const columns = useMemo(() => {
  //   return columnConfig(DT_CATEGORY_COLUMN)
  // }, [])

  // const action = useCallback((row, deleteType, handleDelete) => {
  //   let actionMenu = []
  //   action.push(<EditAction key='edit' href={ADMIN_CATEGORY_EDIT(row.original._id)}/>)
  //   action.push(<DeleteAction key='delete' handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
  //   return actionMenu
  // }, [])

  const [data, setData] = useState<CATEGORY_TYPE[]>([]);
  useEffect(() => {
    getData().then(setData)
  }, [])
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

          <DataTable columns={DT_CATEGORY_COLUMN} data={data}/>
        </CardContent>
      </Card> 
    </div>
  )
}

export default ShowCategory