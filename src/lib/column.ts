"use client"
 
import { ColumnDef } from "@tanstack/react-table"


// export const DT_CATEGORY_COLUMN = [
//     {
//         accessorKey: 'name',
//         header: 'Category Name'
//     },
//     {
//         accessorKey: 'Slug',
//         header: 'Slug'
//     }
// ]

export type CATEGORY_TYPE = {
    name: string;
    slug: string;
    createDate: string;
}

export const DT_CATEGORY_COLUMN: ColumnDef<CATEGORY_TYPE>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createDate",
    header: "Created Date",
  },
]