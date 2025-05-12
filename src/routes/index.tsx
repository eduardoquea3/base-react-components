import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="min-h-screen w-full bg-black text-white">NONE</div>
}
