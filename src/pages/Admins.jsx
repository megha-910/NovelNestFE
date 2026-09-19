
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Admins.css";

function Admins() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div className="admin-sidebar">

            <div className="admin-logo">
                📖 NovelNest
                <span>Admin</span>
            </div>

            <nav>

                <NavLink to="/admin">
                    📊 Dashboard
                </NavLink>

                <NavLink to="/admin/books">
                    📚 Manage Books
                </NavLink>

                <NavLink to="/admin/users">
                    👥 Manage Users
                </NavLink>

                <NavLink to="/admin/orders">
                    🛒 Manage Orders
                </NavLink>

            </nav>

            <button
                className="admin-logout"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>
    );
}

export default Admins;

