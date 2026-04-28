export default function getRole() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userRole = user?.role;
    return userRole
}