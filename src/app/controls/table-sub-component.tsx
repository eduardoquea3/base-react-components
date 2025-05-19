import { useState, useEffect } from "react"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ChevronDown, ChevronRight, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useDataTable } from "@/shared/hooks/useDataTable"
import { DataTable } from "@/shared/components/ui/data-table"

interface Movement {
  movementType: string
  totalAmount: number
  foundAmount: number
  observation: string
}

const initialData: Movement[] = [
  {
    movementType: "Ingreso",
    totalAmount: 1000,
    foundAmount: 900,
    observation: "Todo cuadra",
  },
  {
    movementType: "Egreso",
    totalAmount: 500,
    foundAmount: 450,
    observation: "Faltan 50",
  },
]

export default function MovementTable() {
  const columns: ColumnDef<Movement>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => (
        <button
          onClick={() => row.toggleExpanded()}
          className="p-1"
          aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      ),
    },
    {
      accessorKey: "movementType",
      header: "Tipo de Movimiento",
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
    },
    {
      accessorKey: "foundAmount",
      header: "Encontrado",
      cell: ({ row, column, table }) => {
        const externalValue = row.getValue<number>("foundAmount")
        const [value, setValue] = useState(externalValue)

        useEffect(() => {
          setValue(externalValue)
        }, [externalValue])

        return (
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(Number(e.target.value))
              table.options.meta?.updateData?.(
                row.index,
                column.id,
                Number(e.target.value),
              )
            }}
            min={0}
            className="w-20 border px-1"
          />
        )
      },
    },
    {
      id: "diference",
      header: "Diferencia",
      cell: ({ row }) => {
        const total = row.getValue<number>("totalAmount")
        const found = row.getValue<number>("foundAmount")
        return total - found
      },
    },
    {
      accessorKey: "observation",
      header: "Observación",
      cell: ({ row, column, table }) => {
        const [open, setOpen] = useState(false)
        const [tempValue, setTempValue] = useState<string>(
          row.getValue("observation") ?? "",
        )

        const saveObservation = () => {
          table.options.meta?.updateData?.(row.index, column.id, tempValue)
          setOpen(false)
        }

        return (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Pencil className="w-4 h-4 mr-1" /> Editar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <textarea
                className="w-full border p-2"
                rows={4}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
              <Button onClick={saveObservation}>Guardar</Button>
            </DialogContent>
          </Dialog>
        )
      },
    },
  ]

  const table = useDataTable({
    data: initialData,
    columns,
    showRows: 5,
    enableSorting: true,
    getRowCanExpand: () => true,
  })

  const handleLogData = () => {
    console.log(
      "Movimientos actuales:",
      table.getRowModel().rows.map((r) => r.original),
    )
  }

  const renderSubComponent = ({ row }: { row: Row<Movement> }) => (
    <div className="bg-gray-100 p-4 text-sm text-gray-700">
      <pre>{JSON.stringify(row.original, null, 2)}</pre>
    </div>
  )

  return (
    <div className="space-y-4">
      <DataTable
        table={table}
        isLoading={false}
        renderSubComponent={renderSubComponent}
      />
      <Button onClick={handleLogData}>Imprimir datos de la tabla</Button>
    </div>
  )
}
