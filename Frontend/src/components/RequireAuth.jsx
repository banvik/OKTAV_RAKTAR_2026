import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
	const isLoggedIn = !!sessionStorage.getItem("user");

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
