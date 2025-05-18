import { Fragment, JSX } from "react"
import { Table, Row } from "@tanstack/react-table"
import { AnimatePresence, motion } from "framer-motion"
import { SyncLoader } from "react-spinners"
import { cn } from "@/lib/utils"

interface DataTableBodyProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  renderSubComponent?: (props: { row: Row<TData> }) => JSX.Element
}

export function DataTableBody<TData>({
  table,
  isLoading = false,
  renderSubComponent,
}: DataTableBodyProps<TData>) {
  if (table.getRowModel().rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={table.getAllColumns().length}
            className="h-24 text-center text-gray-500"
          >
            {!isLoading ? (
              "No se encontraron resultados"
            ) : (
              <SyncLoader size={8} color="#6366f1" />
            )}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <tr
            data-state={row.getIsSelected() && "selected"}
            onClick={(e) => {
              if (!table.options.enableRowSelection) return
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
              if (
                !table.options.enableRowSelection ||
                !table.options.enableMultiRowSelection
              )
                return
              const target = e.target as HTMLElement
              if (
                target.closest(
                  "button, a, input, select, textarea, label, span",
                )
              )
                return
              row.toggleSelected(true)
            }}
            className={cn(
              "transition-colors duration-200",
              row.getIsSelected()
                ? "bg-indigo-50 hover:bg-indigo-100"
                : "hover:bg-muted",
            )}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="border-gray-200 border-b px-4 py-2 text-gray-800 text-sm"
              >
                {cell.column.columnDef.cell instanceof Function
                  ? cell.column.columnDef.cell(cell.getContext())
                  : cell.column.columnDef.cell}
              </td>
            ))}
          </tr>
          <AnimatePresence initial={false}>
            {row.getIsExpanded() && renderSubComponent && (
              <motion.tr layout>
                <td
                  colSpan={
                    row.getVisibleCells().length + (row.getCanExpand() ? 1 : 0)
                  }
                  className="border-t p-0"
                >
                  <motion.div
                    initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {renderSubComponent({ row })}
                  </motion.div>
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </Fragment>
      ))}
    </tbody>
  )
}
