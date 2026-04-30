import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function LoginPage() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        username: userName,
        password: password,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Sikertelen bejelentkezés");
    }

    const data = await response.json();

    sessionStorage.setItem(
        "user",
        JSON.stringify({
        fullName: data.fullName,
        role: data.roleName,
        }),
    );

    toast.success(data.message || "Sikeres bejelentkezés!");
    navigate("/");
    } catch (error) {
    console.error(error);
    toast.error("Hibás felhasználónév vagy jelszó!");
    }
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#FFFBBD] text-[#153B08] font-[Montserrat,_sans-serif]">
			<ToastContainer />
			<form
				onSubmit={handleLogin}
				className="bg-[#EEEBAB] p-8 rounded-2xl shadow-md w-full max-w-sm flex flex-col gap-4"
			>
				<h1 className="text-2xl font-semibold text-center">
					Bejelentkezés
				</h1>

				<input
					type="text"
					placeholder="Felhasználónév"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="p-2 rounded border border-[#153B08]/30 focus:outline-none"
				/>

				<input
					type="password"
					placeholder="Jelszó"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="p-2 rounded border border-[#153B08]/30 focus:outline-none"
				/>

				<button
					type="submit"
					className="bg-[#153B08] text-white py-2 rounded hover:opacity-90 transition"
				>
					Belépés
				</button>
			</form>
		</div>
	);
}
