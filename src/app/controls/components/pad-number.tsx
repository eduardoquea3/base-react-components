import { Eraser } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface NumpadProps {
	onNumberClick: (value: string) => void;
	show?: boolean;
	onBlur?: () => void;
	anchorRef?: React.RefObject<HTMLElement>;
}

function useIsMobile(breakpoint = 640) {
	const [isMobile, setIsMobile] = useState(
		() => window.innerWidth < breakpoint,
	);

	useEffect(() => {
		const handler = () => setIsMobile(window.innerWidth < breakpoint);
		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, [breakpoint]);

	return isMobile;
}

const NumPad: React.FC<NumpadProps> = ({
	onNumberClick,
	show = false,
	onBlur,
	anchorRef,
}) => {
	const padValues = useMemo(
		() => ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "Limpiar"],
		[],
	);
	const numpadRef = useRef<HTMLDivElement | null>(null);
	const [position, setPosition] = useState<{
		top: number;
		left: number;
	} | null>(null);
	const isMobile = useIsMobile();

	useEffect(() => {
		if (!isMobile && show && anchorRef?.current) {
			const rect = anchorRef.current.getBoundingClientRect();
			const numpadWidth = 240; // w-60 = 240px
			const numpadHeight = 256; // altura aproximada del numpad

			// Calcular posición preferida
			let top = rect.top + window.scrollY + rect.height / 2 - numpadHeight / 2;
			let left = rect.right + window.scrollX + 8;

			// Ajustar si se sale por la derecha
			if (left + numpadWidth > window.innerWidth) {
				left = rect.left + window.scrollX - numpadWidth - 8;
			}

			// Ajustar si se sale por la izquierda
			if (left < 0) {
				left = 8;
			}

			// Ajustar si se sale por arriba
			if (top < 0) {
				top = 8;
			}

			// Ajustar si se sale por abajo
			if (top + numpadHeight > window.innerHeight + window.scrollY) {
				top = window.innerHeight + window.scrollY - numpadHeight - 8;
			}

			setPosition({ top, left });
		} else {
			setPosition(null);
		}
	}, [show, anchorRef, isMobile]);

	if (!show) return null;

	const getClassName = () => {
		const baseClass =
			"grid grid-cols-3 gap-3 p-4 bg-white rounded-lg shadow-md border border-blue-200 w-60 select-none z-50";

		if (isMobile) {
			return `${baseClass} fixed bottom-0 left-0 w-full rounded-b-none border-t`;
		}

		if (position) {
			return baseClass;
		}

		return `${baseClass} fixed left-1/2 -translate-x-1/2 bottom-8`;
	};

	const getStyle = () => {
		return !isMobile && position
			? {
					position: "absolute" as const,
					top: position.top,
					left: position.left,
				}
			: {};
	};

	const NumpadGrid = (
		<div
			ref={numpadRef}
			tabIndex={0}
			onBlur={onBlur}
			className={getClassName()}
			style={getStyle()}
			aria-hidden={false}
			role="group"
		>
			{padValues.map((value) => (
				<button
					key={value}
					type="button"
					onClick={() => onNumberClick(value)}
					onMouseDown={(e) => e.preventDefault()}
					className="py-2 px-0 rounded-md text-base font-semibold border border-blue-400 bg-white text-blue-700 transition-colors duration-150 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-100"
					style={{ minWidth: 0 }}
				>
					{value === "Limpiar" ? (
						<Eraser className="w-6 h-6 mx-auto" strokeWidth={2} />
					) : (
						value
					)}
				</button>
			))}
		</div>
	);

	return !isMobile && position
		? createPortal(NumpadGrid, document.body)
		: NumpadGrid;
};

export default NumPad;
