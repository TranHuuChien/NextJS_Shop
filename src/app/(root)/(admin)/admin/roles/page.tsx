import React from 'react'
import {ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_CUSTOMER_SHOW, ADMIN_DASHBOARD} from '@/routes/AdminPanelRoute'
import CustomSelect from "@/components/customs/select";
//import { OBJECT_USER_TYPE, OBJECT_USER_STATUS } from "@/types/user"
import BreadCrumb from "@/components/application/admin/BreadCrumb";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import CustomDataGrid from "@/components/customs/grid-data";
import Link from 'next/link'
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {PERMISSIONS} from "@/types/permisions";

const breadcrumbData = [
    {href: ADMIN_DASHBOARD, label: 'Home'},
    {href: ADMIN_CUSTOMER_SHOW}
]

//** Status user
// const OBJECT_USER_STATUS_SELECT = OBJECT_USER_STATUS()
// const OBJECT_USER_TYPE_SELECT = OBJECT_USER_TYPE()
const USER_STATUS = [
    {
        label: "Active",
        value: "1"
    },
    {
        label: "Unactive",
        value: "0"
    }
]

const ShowCustomer = () => {

    // handle
    const getValuePermission = (value: string, mode: string, parentValue: string) => {
        try {
            return parentValue ? (PERMISSIONS as any)[parentValue][value][mode] : (PERMISSIONS as any)[value]
        } catch (error) {

        }
    }


    const columns: GridColDef[] = [
        {
            field: "all",
            headerName: "",
            minWidth: 80,
            maxWidth: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                //const { isChecked, allValue } =
            }
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return {

                }
            }
        }
    ]

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData}/>

            <CustomSelect options={USER_STATUS}/>

            <Card className='py-0 rounded shadow-sm'>
                <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
                    <div className='flex justify-between items-center'>
                        <h4 className='text-xl font-semibold'>Show User</h4>
                        <Button>
                            <FiPlus/>
                            <Link href={ADMIN_CATEGORY_ADD}>New User</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className='pb-5'>
                    {/*<CustomDataGrid*/}
                    {/*    columns={columns}*/}
                    {/*    autoHeight*/}
                    {/*    sorting={['desc', 'asc']}*/}
                    {/*    sortingMode='server'*/}
                    {/*    slots={{*/}
                    {/*        pagination: PaginationComponent*/}
                    {/*    }}*/}
                    {/*/>*/}

                </CardContent>
            </Card>
        </div>
    )
}

export default ShowCustomer