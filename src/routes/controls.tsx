import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/controls')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/controls"!</div>
}
