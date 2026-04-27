import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
	const isLoggedIn = !!localStorage.getItem("user");

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
