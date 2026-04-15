import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function BaseLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
	return (
		<div>
			<nav>
				<button
					className="hamburger"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					☰
				</button>

				<div className={menuOpen ? "nav-links open" : "nav-links"}>
					<Link to="/">Termékek</Link>
					<Link to="/warehouses">Raktár</Link>
					<Link to="/transactions">Tranzakciók</Link>
				</div>
			</nav>
			<main style={{ padding: "20px" }}>
				<Outlet />
			</main>
		</div>
	);
}
