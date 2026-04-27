export default function ConfirmModal({
	isOpen,
	title = "Megerősítés",
	message,
	onConfirm,
	onCancel,
	confirmText = "Törlés",
	cancelText = "Mégse",
}) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={onCancel}
		>
			<div
				className="bg-[#EEEBAB] p-6 rounded-xl shadow-xl min-w-[300px]"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-xl mb-3">{title}</h2>

				<p className="mb-4">{message}</p>

				<div className="flex justify-end gap-3">
					<button onClick={onCancel} className="px-3 py-1">
						{cancelText}
					</button>

					<button
						onClick={onConfirm}
						className="px-3 py-1 bg-red-600 text-white rounded"
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}
