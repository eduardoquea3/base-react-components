import TableBase from "@/app/controls/table-base"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/controls")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <TableBase />
    </main>
  )
}
