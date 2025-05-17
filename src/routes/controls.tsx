import { DataTable } from "@/shared/components/ui/data-table"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/controls")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <DataTable />
    </main>
  )
}
