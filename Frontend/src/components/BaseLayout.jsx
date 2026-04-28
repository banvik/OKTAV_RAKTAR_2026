import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";
import ConfirmModal from "./ConfirmModal";
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BaseLayout() {
	const [menuOpen, setMenuOpen] = useState(false);	
	const [confirmOpen, setConfirmOpen] = useState(false);

	function handleLogout() {
		localStorage.removeItem("user");
		window.location.href = "/login";
	};

	const userName = JSON.parse(localStorage.getItem("user")).userName

	return (
		<div className="min-h-screen bg-[#FFFBBD] text-[#153B08] font-[Montserrat,_sans-serif]">
			<nav className="flex  pt-4 px-1 md:p-4 text-xl justify-between">
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
						${menuOpen ? "flex flex-col absolute top-14 left-4 bg-[#EEEBAB] p-4 rounded-xl shadow z-50" : "hidden md:flex"}
					`}
				>
					<CustomNavLink to="/">Raktár</CustomNavLink>
					<CustomNavLink to="/products">Termékek</CustomNavLink>
				</div>
				<div className="flex gap-2">
				<p className="text-center py-2">Üdvözöljük, {userName}!</p>
				<button className="hidden md:block"onClick={() =>setConfirmOpen(true)}>Kijelentkezés</button>
				<button className="md:hidden"onClick={() =>setConfirmOpen(true)}>{<FaSignOutAlt/>}</button>
				</div>
			</nav>
			<main className="md:p-4">
				<ToastContainer />
				<ConfirmModal
						isOpen={confirmOpen}
						title="Kijelentkezés"
						message={`Biztosan kijelentkezik a rendszerből?`}
						confirmText="Kijelentkezés"
						onConfirm={handleLogout}
						onCancel={()=>setConfirmOpen(false)}
				/>
				<Outlet />
			</main>
		</div>
	);
}
