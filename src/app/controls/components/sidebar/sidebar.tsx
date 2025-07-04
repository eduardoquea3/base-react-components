import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export interface SidebarContainerProps extends PropsWithChildren {
	/**
	 * Clase extra para estilos personalizados
	 */
	className?: string;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("w-screen min-h-screen flex", className)}>{children}</div>
	);
};

export interface SidebarPanelProps extends PropsWithChildren {
	/**
	 * Clase extra para estilos personalizados
	 */
	className?: string;
}

/**
 * Panel interno del sidebar. Aquí va el contenido dinámico que cambia según la ruta/opción.
 */
export const SidebarPanel: React.FC<SidebarPanelProps> = ({
	children,
	className,
}) => {
	return (
		<div
			className={cn(
				"relative h-full overflow-y-auto bg-yellow-100 shadow-lg",
				className,
			)}
		>
			{children}
		</div>
	);
};

/**
 * Sección de navegación/opciones del sidebar (menú, botones, etc).
 * Úsalo dentro de SidebarContainer para estructurar el contenido.
 */
export interface SidebarProps extends PropsWithChildren {
	className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
	return (
		<nav
			className={cn(
				"flex flex-col gap-2 p-4 items-start bg-gray-200",
				className,
			)}
		>
			{children}
		</nav>
	);
};
