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
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"

interface UseDataTableOptions<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  showRows?: number
  enableRowSelection?: boolean
  enableMultiRowSelection?: boolean
  enableColumnVisibility?: boolean
  enableSorting?: boolean
  enableFilters?: boolean
  getRowCanExpand?: (row: Row<TData>) => boolean
}

export function useDataTable<TData>({
  data,
  columns,
  showRows = 10,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableColumnVisibility = true,
  enableSorting = true,
  enableFilters = true,
  getRowCanExpand,
}: UseDataTableOptions<TData>) {
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
  })

  return table
}
