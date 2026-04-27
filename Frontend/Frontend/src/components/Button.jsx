export default function Button({handleClick, buttonIcon, buttonText}){
    return (
		<div className="relative group inline-flex justify-center">
			<button
				className="p-1"
				onClick={handleClick}
			>
				{buttonIcon}
			</button>

			<div className="absolute bottom-full left-1/2 -translate-x-1/2 hidden group-hover:block">
				<div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
					{buttonText}
				</div>
			</div>
		</div>
	);
}