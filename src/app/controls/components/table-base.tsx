import { DataTable } from "@/shared/components/ui/data-table"
import { useDataTable } from "@/shared/hooks/useDataTable"
import type { ColumnDef } from "@tanstack/react-table"

interface Person {
  id: number
  name: string
  age: number
  city: string
}

const data: Person[] = [
  { id: 1, name: "Juan", age: 25, city: "Madrid" },
  { id: 2, name: "Ana", age: 30, city: "Barcelona" },
  { id: 3, name: "Luis", age: 22, city: "Valencia" },
  { id: 4, name: "Marta", age: 28, city: "Sevilla" },
]

const columns: ColumnDef<Person>[] = [
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

export default function TableBase() {
  const table = useDataTable({
    data,
    columns,
    showRows: 5,
    enableRowSelection: false,
    enableMultiRowSelection: false,
    enableSorting: false,
    enableFilters: false,
    enableColumnVisibility: false,
  })

  return <DataTable table={table} isLoading={false} />
}
