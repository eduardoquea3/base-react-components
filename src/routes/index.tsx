import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      <section className="flex w-fit flex-col items-center gap-8 rounded-xl bg-white p-8 shadow-lg">
        <header className="flex w-full flex-col items-center gap-2">
          <h1 className="mb-2 text-center font-extrabold text-5xl text-gray-900">
            Component Explorer
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Choose a category to explore different component implementations.
          </p>
        </header>
        <nav className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <Link
            to="/controls"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex h-fit w-60 flex-col items-center gap-2 border-2 border-blue-200 p-4 transition-all hover:border-blue-400",
            )}
          >
            <h3 className="font-semibold text-2xl text-blue-700">Controls</h3>
            <p className="text-wrap text-center text-gray-500 text-sm ">
              Basic UI components with no external logic library.
            </p>
          </Link>
          <Link
            to="/react-hook-form"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex h-fit w-60 flex-col items-center gap-2 border-2 border-green-200 p-4 transition-all hover:border-green-400",
            )}
          >
            <span className="font-semibold text-2xl text-green-700">
              React Hook Form
            </span>
            <span className="text-wrap text-center text-gray-500 text-sm">
              Components adapted for <b>react-hook-form</b> integration.
            </span>
          </Link>
          <Link
            to="/tanstack-form"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex h-fit w-60 flex-col items-center gap-2 border-2 border-purple-200 p-4 transition-all hover:border-purple-400",
            )}
          >
            <span className="font-semibold text-2xl text-purple-700">
              TanStack Form
            </span>
            <span className="text-wrap text-center text-gray-500 text-sm">
              Components built using <b>TanStack Form</b> logic.
            </span>
          </Link>
        </nav>
      </section>
    </main>
  )
}
