'use client'

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { jwtVerify } from 'jose';

interface ResponseType {
    success?: number;
    statusCode?: string;
    message?: string;
    data?: string;
}

interface RoleType {
    role: string
}

interface ColumnConfig {
    column: any[],
    isCreatedAt: boolean,
    isUpdatedAt: boolean,
    isDeletedAt: boolean
}

// export const isAuthenticated = async ({role} : RoleType) => {
//     try {
//         const cookieStore = await cookies()
//         if(!cookieStore.has('access_token')) {
//             return {
//                 isAuth: false,
//             }
//         }
//         const access_token = cookieStore.get('access_token')
//         //const { payload } = await jwtVerify(access_token.value, new TextEncoder().encode(process.env.SECRET_KEY));  

//     } catch (error) {

//     };
// }


export const columnConfig = (props: ColumnConfig) => {
    //const newColumn = [... props.column]
    const newColumn = [...(props.column || [])];

    if(props.isCreatedAt) {
        newColumn.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ getValue }: { getValue: () => any }) => {
                const value = getValue();
                return value ? new Date(value).toLocaleString() : "";
            },
        })
    }

    if (props.isUpdatedAt) {
    newColumn.push({
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return value ? new Date(value).toLocaleString() : "";
      },
    });
  }

  if (props.isDeletedAt) {
    newColumn.push({
      accessorKey: "deletedAt",
      header: "Deleted At",
      cell: ({ getValue }: { getValue: () => any }) => {
        const value = getValue();
        return value ? new Date(value).toLocaleString() : "";
      },
    });
  }
  return newColumn
}