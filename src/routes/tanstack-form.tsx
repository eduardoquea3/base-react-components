import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tanstack-form')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tanstack-form"!</div>
}
