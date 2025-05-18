import { DataTable } from "@/shared/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"

interface Person {
  id: number
  name: string
  age: number
  city: string
}

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

const data: Person[] = [
  { id: 1, name: "Ana", age: 28, city: "Madrid" },
  { id: 2, name: "Luis", age: 34, city: "Barcelona" },
  { id: 3, name: "María", age: 22, city: "Valencia" },
  { id: 4, name: "Carlos", age: 45, city: "Sevilla" },
]

export default function TableBase() {
  const [selectedRows, setSelectedRows] = useState<Person[]>([])

  return (
    <div style={{ padding: 20 }}>
      <h2>Ejemplo DataTable</h2>
      <DataTable
        data={data}
        columns={columns}
        showRows={5}
        dataId="id"
        onRowSelect={(rows) => setSelectedRows(rows)}
      />
      <div style={{ marginTop: 20 }}>
        <h3>Filas seleccionadas:</h3>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  )
}
