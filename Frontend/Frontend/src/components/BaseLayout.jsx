import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function BaseLayout() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-[#FFFBBD] text-[#153B08] font-[Montserrat,_sans-serif]">
			<nav className="flex p-4 text-xl">
				<button
					className="text-2xl md:hidden"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					☰
				</button>
				<div
					className={`
						gap-4
						md:flex md:static md:flex-row md:bg-transparent md:p-0 md:shadow-none
						${menuOpen ? "flex flex-col absolute top-14 left-4 bg-[#EEEBAB] p-4 rounded-xl shadow" : "hidden md:flex"}
					`}
				>
					<Link to="/">Termékek</Link>
					<Link to="/warehouses">Raktár</Link>
					<Link to="/transactions">Tranzakciók</Link>
				</div>
			</nav>
			<main className="p-5">
				<Outlet />
			</main>
		</div>
	);
}
