import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 p-4">
      <div className="grid grid-cols-3 items-center gap-4">
        <h2 className="col-span-3 text-center font-bold text-4xl">
          Base Components
        </h2>
        <Link
          to="/controls"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Controls
        </Link>
        <Link
          to="/react-hook-form"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          React Hook Form
        </Link>
        <Link
          to="/tanstack-form"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          TanStack Form
        </Link>
      </div>
    </div>
  )
}
