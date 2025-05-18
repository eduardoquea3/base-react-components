import { DataTable } from "@/shared/components/ui/data-table"
import { useDataTable } from "@/shared/hooks/useDataTable"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Person {
  id: number
  name: string
  age: number
  city: string
  description: string
}

const data: Person[] = [
  {
    id: 1,
    name: "Juan",
    age: 25,
    city: "Madrid",
    description: "Juan es un desarrollador frontend que trabaja en Madrid.",
  },
  {
    id: 2,
    name: "Ana",
    age: 30,
    city: "Barcelona",
    description: "Ana es diseñadora UX con 5 años de experiencia.",
  },
  {
    id: 3,
    name: "Luis",
    age: 22,
    city: "Valencia",
    description: "Luis está estudiando ingeniería informática.",
  },
  {
    id: 4,
    name: "Marta",
    age: 28,
    city: "Sevilla",
    description: "Marta trabaja como project manager en Sevilla.",
  },
]

const columns: ColumnDef<Person>[] = [
  {
    id: "expander", // id para esta columna de toggle
    header: () => null, // no poner texto en header
    cell: ({ row }) => (
      <button
        onClick={() => row.toggleExpanded()}
        aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
        className="p-1"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 30,
  },
  // las demás columnas
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "age",
    header: "Edad",
  },
  {
    accessorKey: "city",
    header: "Ciudad",
  },
]

export default function TableSubComponent() {
  const table = useDataTable({
    data,
    columns,
    showRows: 5,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableSorting: true,
    enableFilters: true,
  })

  const renderSubComponent = ({ row }: { row: Row<Person> }) => {
    return (
      <div className="bg-gray-50 p-4 text-gray-700 text-sm">
        <strong>Descripción:</strong> {row.original.description}
      </div>
    )
  }

  return (
    <DataTable
      table={table}
      isLoading={false}
      renderSubComponent={renderSubComponent}
    />
  )
}
