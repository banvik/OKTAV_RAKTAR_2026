import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BaseLayout() {
	const [menuOpen, setMenuOpen] = useState(false);

	function handleLogout() {
		localStorage.removeItem("user");
		window.location.href = "/login";
	};

	const userName = JSON.parse(localStorage.getItem("user")).userName

	return (
		<div className="min-h-screen bg-[#FFFBBD] text-[#153B08] font-[Montserrat,_sans-serif]">
			<nav className="flex p-4 text-xl justify-between">
				<button
					className="text-2xl md:hidden"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					☰
				</button>
				<div
					className={`
						gap-4
						md:flex md:static md:flex-row md:bg-transparent md:p-2 md:shadow-none
						${menuOpen ? "flex flex-col absolute top-14 left-4 bg-[#EEEBAB] p-4 rounded-xl shadow" : "hidden md:flex"}
					`}
				>
					<CustomNavLink to="/">Raktár</CustomNavLink>
					<CustomNavLink to="/products">Termékek</CustomNavLink>
				</div>
				<div className="flex gap-2">
				<p className="text-center py-2">Üdvözöljük, {userName}!</p>
				<button onClick={handleLogout}>Kijelentkezés</button>
				</div>
			</nav>
			<main className="p-5">
				<ToastContainer />
				<Outlet />
			</main>
		</div>
	);
}
