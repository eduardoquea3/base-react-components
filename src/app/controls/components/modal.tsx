import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useModalStore } from "../store/modal.store";

interface ModalProps {
	id: string;
	children: React.ReactNode;
	className?: string;
	closeOnBackdrop?: boolean;
}

export default function Modal({
	id,
	children,
	className = "",
	closeOnBackdrop = true,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const { openModals, closeModal } = useModalStore();

	const isOpen = openModals.some((modal) => modal.id === id);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen && !dialog.open) {
			dialog.showModal();
		} else if (!isOpen && dialog.open) {
			dialog.close();
		}
	}, [isOpen]);

	const handleClose = () => {
		closeModal(id);
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (closeOnBackdrop && e.target === e.currentTarget) {
			handleClose();
		}
	};

	return (
		<dialog
			ref={dialogRef}
			className={cn(
				"backdrop:bg-black/50 p-0 border-none bg-transparent fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
				className,
			)}
			onClick={handleBackdropClick}
			onClose={handleClose}
		>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.8, y: -20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ 
						type: "spring", 
						stiffness: 300, 
						damping: 30,
						duration: 0.2 
					}}
					className="relative bg-white p-6 rounded-lg shadow-lg"
				>
					<button
						onClick={handleClose}
						className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
						aria-label="Close modal"
					>
						×
					</button>
					{children}
				</motion.div>
			)}
		</dialog>
	);
}
