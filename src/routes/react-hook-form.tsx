import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/react-hook-form")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/react-hook-form"!</div>
}
