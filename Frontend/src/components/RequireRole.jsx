import { Navigate } from "react-router-dom";
import getRole from "../helpers/getRole";


export default function RequireRole({ role, children }) {
    const userRole = getRole();

    if (!userRole) {
    return <Navigate to="/login" replace />;
    }

    if (userRole !== role) {
    return <Navigate to="/" replace />;
    }

    return children;
}
