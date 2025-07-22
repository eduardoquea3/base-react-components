import { createFileRoute, Link } from "@tanstack/react-router";
import Modal from "@/app/controls/components/modal";
import {
	Sidebar,
	SidebarContainer,
	SidebarPanel,
} from "@/app/controls/components/sidebar";
import { useModalStore } from "@/app/controls/store/modal.store";
import { useSidebar } from "@/shared/hooks/useSidebar";

export const Route = createFileRoute("/controls/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { togglePosition, position } = useSidebar();
	const { openModal } = useModalStore();

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
				<button
					className="px-4 py-2 mt-2 bg-blue-500 text-white rounded"
					onClick={() => openModal("example-modal")}
				>
					Abrir Modal
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

			<Modal id="example-modal" className="max-w-md" closeOnBackdrop={false}>
				<h2 className="text-xl font-bold mb-4">Modal de Ejemplo</h2>
				<p className="mb-4">
					Este es un ejemplo de modal usando la etiqueta &lt;dialog&gt; nativa
					de HTML y el store de Zustand.
				</p>
				<button
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					onClick={() => openModal("second-modal")}
				>
					Abrir otro modal
				</button>
			</Modal>

			<Modal id="second-modal" className="max-w-sm">
				<h2 className="text-lg font-bold mb-4">Segundo Modal</h2>
				<p>Este es un segundo modal que se puede abrir desde el primero.</p>
			</Modal>
		</SidebarContainer>
	);
}
