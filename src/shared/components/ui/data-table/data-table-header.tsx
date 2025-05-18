import { Table } from "@tanstack/react-table"

interface DataTableHeaderProps<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <thead className="bg-muted/50">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{ width: `${header.getSize()}px` }}
              className="select-none border-border border-b bg-background/80 px-4 py-3 text-left font-semibold text-muted-foreground text-sm"
            >
              {header.isPlaceholder
                ? null
                : header.column.columnDef.header instanceof Function
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
