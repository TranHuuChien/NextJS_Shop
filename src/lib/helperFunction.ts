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

export const formatNumberToLocal = (value: string | number) => {
    try {
        return Number(value).toLocaleString('vi-VN', {
            minimumFractionDigits: 0
        })
    } catch (error) {
        return value
    }
}

export const formatDate = (
    value: Date | string,
    formatting: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' }
) => {
    if (!value) return value

    return Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value))
}

export const hexToRGBA = (hexCode: string, opacity: number) => {
    let hex = hexCode.replace('#', '')

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    }

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
}