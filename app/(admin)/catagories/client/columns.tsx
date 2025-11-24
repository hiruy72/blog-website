"use client"
 
import { Button } from "@/components/ui/button"
import { Catagory } from "@/lib/generated/prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
export const columns: ColumnDef<Catagory>[] = [
      {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({column}) => {
        return (
            <Button variant="ghost" onClick={()=> column.toggleSorting(column.getIsSorted()==="asc")}> Name
            <ArrowUpDown/>
            </Button>
        )
    },
    cell: ({ row }) => <div className="lowercase"> {row.getValue("name")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({row})=> {
        const { userId, createdAt, updatedAt,...data}= row.original;
        return <CellAction/>
    }
  }
]