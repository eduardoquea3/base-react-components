import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Fragment, JSX, useEffect, useMemo, useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { SyncLoader } from "react-spinners"

interface DataTableProps<TData> {
  data?: TData[] | undefined
  columns: ColumnDef<TData>[]
  showRows?: number
  isLoading?: boolean
  dataId?: keyof TData
  showSelectPageSize?: boolean
  className?: string
  multiRowSelect?: boolean
  onRowSelect?: (rows: TData[]) => void
  renderSubComponent?: (props: { row: Row<TData> }) => JSX.Element
  getRowCanExpand?: (row: Row<TData>) => boolean
}

export function DataTable<TData>({
  data,
  columns,
  showRows = 10,
  isLoading = false,
  dataId,
  className,
  multiRowSelect = true,
  onRowSelect,
  renderSubComponent,
  getRowCanExpand,
}: DataTableProps<TData>) {
  const tableData = useMemo(() => data ?? [], [data])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: showRows,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: tableData,
    columns: columns,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: !!onRowSelect,
    enableMultiRowSelection: multiRowSelect,
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row, index) => {
      const id = dataId ? row[dataId] : index
      return String(id)
    },
  })

  useEffect(() => {
    if (onRowSelect) {
      const selectedRows = table
        .getCoreRowModel()
        .rows.filter((row) => row.getIsSelected())
        .map((row) => row.original)
      onRowSelect(selectedRows)
    }
  }, [rowSelection])

  useEffect(() => {
    table.getCoreRowModel().rows.forEach((row) => {
      row.toggleSelected(false)
    })
  }, [data])

  return (
    <div
      className={cn("flex w-full flex-col justify-between gap-2", className)}
    >
      <ScrollArea className="rounded-md border">
        <table>
          <thead className="bg-gray-200 hover:bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: `${header.getSize()}px`,
                    }}
                    className="select-none hover:bg-gray-200"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {(() => {
              if (table.getRowModel().rows.length === 0) {
                return (
                  <tr className="hover:bg-transparent">
                    <td colSpan={columns.length} className="h-24 text-center">
                      <div>
                        {!isLoading ? (
                          "No se encontraron resultados"
                        ) : (
                          <SyncLoader size={8} color="#6366f1" />
                        )}
                      </div>
                    </td>
                  </tr>
                )
              }

              return table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <tr
                    data-state={row.getIsSelected() && "selected"}
                    onClick={(e) => {
                      if (!onRowSelect) return
                      const target = e.target as HTMLElement
                      if (
                        target.closest(
                          "button, a, input, select, textarea, label, span",
                        )
                      )
                        return
                      row.toggleSelected()
                    }}
                    onDoubleClick={(e) => {
                      if (!onRowSelect && !multiRowSelect) return
                      const target = e.target as HTMLElement
                      if (
                        target.closest(
                          "button, a, input, select, textarea, label, span",
                        )
                      )
                        return
                      row.toggleSelected(true)
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && renderSubComponent && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent?.({ row })}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            })()}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
