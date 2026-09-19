import { useEffect, useState } from "react";
import api from "../services/api";
import "../css/Admin.css";

function Admin() {

    const [dashboard, setDashboard] = useState({
        totalBooks: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const response = await api.get("/admin/dashboard");

            setDashboard(response.data);

        } catch (error) {

            console.error("Dashboard error:", error);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading Dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">

            <h1>Admin Dashboard</h1>
            <p className="dashboard-subtitle">
                Welcome to NovelNest Administration
            </p>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <div className="card-icon">📚</div>
                    <div>
                        <h3>Total Books</h3>
                        <h2>{dashboard.totalBooks}</h2>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">👥</div>
                    <div>
                        <h3>Total Users</h3>
                        <h2>{dashboard.totalUsers}</h2>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">🛒</div>
                    <div>
                        <h3>Total Orders</h3>
                        <h2>{dashboard.totalOrders}</h2>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">₹</div>
                    <div>
                        <h3>Total Revenue</h3>
                        <h2>₹{dashboard.totalRevenue}</h2>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Admin;

