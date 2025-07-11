// import TableBase from "@/app/controls/components/table-base"
// import TableSubComponent from "@/app/controls/components/table-sub-component"
// import { Button } from "@/components/ui/button"

import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContainer,
	SidebarPanel,
} from "@/app/controls/components/sidebar";
import { useSidebar } from "@/shared/hooks/useSidebar";

export const Route = createFileRoute("/controls/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { togglePosition, position } = useSidebar();

	return (
		<SidebarContainer>
			<Sidebar>
				<button className="px-4 py-2 mb-2 bg-gray-200 rounded">Opción 1</button>
				<button className="px-4 py-2 mb-2 bg-gray-200 rounded">Opción 2</button>
				<button className="px-4 py-2 mb-2 bg-gray-200 rounded">Opción 3</button>
				<Link
					to="/numpad-demo"
					className="px-4 py-2 mb-2 bg-indigo-500 text-white rounded block text-center hover:bg-indigo-600"
				>
					Demo NumPad
				</Link>
				<button
					className="px-4 py-2 mt-4 bg-green-500 text-white rounded"
					onClick={togglePosition}
				>
					Mover a {position === "left" ? "derecha" : "izquierda"}
				</button>
			</Sidebar>
			<SidebarPanel>
				<h1 className="text-2xl font-bold mb-4">Contenido principal</h1>
				<h2 className="text-lg font-semibold mb-2">Contenido del panel</h2>
				<p>
					Aquí va el contenido que cambia según la opción seleccionada en el
					sidebar.
				</p>
			</SidebarPanel>
		</SidebarContainer>
	);
}
