import { JSX } from "react"
import { Table } from "@tanstack/react-table"
import { DataTableHeader } from "./data-table-header"
import { DataTableBody } from "./data-table-body"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  renderSubComponent?: (props: { row: any }) => JSX.Element
  className?: string
}

export function DataTable<TData>({
  table,
  isLoading = false,
  renderSubComponent,
  className,
}: DataTableProps<TData>) {
  return (
    <div
      className={cn("flex w-full flex-col justify-between gap-2", className)}
    >
      <ScrollArea className="rounded-md border">
        <table className="w-full table-auto border-collapse">
          <DataTableHeader table={table} />
          <DataTableBody
            table={table}
            isLoading={isLoading}
            renderSubComponent={renderSubComponent}
          />
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
