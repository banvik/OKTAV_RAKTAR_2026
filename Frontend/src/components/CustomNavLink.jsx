import { NavLink } from "react-router-dom";

export default function CustomNavLink({ to, children }) {
    return (
        <NavLink
        to={to}
        className={({ isActive }) =>
            isActive
            ? "font-bold underline"
            : "hover:text-green-800"
        }
        >
        {children}
        </NavLink>
    );
}
