import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowData,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"

interface UseDataTableOptions<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  showRows?: number
  enableRowSelection?: boolean
  enableMultiRowSelection?: boolean
  enableColumnVisibility?: boolean
  enableSorting?: boolean
  enableFilters?: boolean
  getRowCanExpand?: (row: Row<TData>) => boolean
}

export function useDataTable<TData extends RowData & Record<string, any>>({
  data: initialData,
  columns,
  showRows = 10,
  enableRowSelection = false,
  enableMultiRowSelection = false,
  enableColumnVisibility = false,
  enableSorting = false,
  enableFilters = false,
  getRowCanExpand,
}: UseDataTableOptions<TData>) {
  const [data, setData] = useState<TData[]>(initialData)

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
    columns,
    state: {
      pagination,
      sorting: enableSorting ? sorting : [],
      columnVisibility: enableColumnVisibility ? columnVisibility : {},
      rowSelection: enableRowSelection ? rowSelection : {},
      columnFilters: enableFilters ? columnFilters : [],
    },
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection,
    enableMultiRowSelection,
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFilters ? setColumnFilters : undefined,
    onColumnVisibilityChange: enableColumnVisibility
      ? setColumnVisibility
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // ⬇ Aquí va el updateData expuesto a través de `meta`
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row,
          ),
        )
      },
    },
  })

  return table
}
