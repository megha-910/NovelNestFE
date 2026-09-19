import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Manageusers.css";
import api from "../services/api";

function Manageusers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // =========================
    // FETCH USERS
    // =========================

    const fetchUsers = async () => {

        try {

            const response =
                await api.get("/user/all");

            console.log(response.data);

            setUsers(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchUsers();

    }, []);


    // =========================
    // ACTIVATE / DEACTIVATE
    // =========================

    const toggleStatus = async (userId) => {

        try {

            const response =
                await api.put(
                    `/user/toggle-status/${userId}`
                );

            alert(response.data.message);

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update user status"
            );
        }
    };


    // =========================
    // DELETE USER
    // =========================

    const deleteUser = async (userId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const response =
                await api.delete(
                    `/user/${userId}`
                );

            alert(response.data.message);

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete user"
            );
        }
    };


    // =========================
    // SEARCH + FILTER
    // =========================

    const filteredUsers = users.filter(
        (user) => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                user.id
                    ?.toString()
                    .includes(searchText)
                ||
                user.username
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesRole =
                roleFilter === "ALL" ||
                user.role === roleFilter;

            return (
                matchesSearch &&
                matchesRole
            );
        }
    );


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="admin-users">
                <h2>Loading users...</h2>
            </div>
        );
    }


    // =========================
    // UI
    // =========================

    return (

        <div className="admin-users">

            {/* HEADER */}

            <div className="users-header">

                <div>
                    <h2>Manage Users</h2>

                    <p>
                        Manage registered users
                    </p>
                </div>

                <span>
                    Total Users: {users.length}
                </span>

            </div>


            {/* SEARCH + FILTER */}

            <div className="users-filter">

                <input
                    type="text"
                    placeholder="Search User ID or Email"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={roleFilter}
                    onChange={(e) =>
                        setRoleFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="ALL">
                        All Users
                    </option>

                    <option value="USER">
                        Users
                    </option>

                    <option value="ADMIN">
                        Admins
                    </option>

                </select>

            </div>


            {/* TABLE */}

            <div className="users-table">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Username</th>

                            <th>Role</th>

                            <th>Verified</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredUsers.length > 0 ? (

                            filteredUsers.map(
                                (user) => (

                                    <tr
                                        key={user.id}
                                    >

                                        <td>
                                            #{user.id}
                                        </td>


                                        <td>
                                            {user.username ||
                                                "N/A"}
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    `role ${user.role
                                                        ?.toLowerCase()}`
                                                }
                                            >
                                                {user.role}
                                            </span>

                                        </td>


                                        <td>

                                            {user.verified ? (

                                                <span className="verified">
                                                    ✓ Verified
                                                </span>

                                            ) : (

                                                <span className="not-verified">
                                                    ✕ Not Verified
                                                </span>

                                            )}

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    user.active
                                                        ? "active-status"
                                                        : "inactive-status"
                                                }
                                            >

                                                {user.active
                                                    ? "Active"
                                                    : "Inactive"}

                                            </span>

                                        </td>


                                        <td>

                                            <button
                                                className="view-user-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/users/${user.id}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>


                                            {user.role !== "ADMIN" && (

                                                <button
                                                    className={
                                                        user.active
                                                            ? "deactivate-btn"
                                                            : "activate-btn"
                                                    }
                                                    onClick={() =>
                                                        toggleStatus(
                                                            user.id
                                                        )
                                                    }
                                                >

                                                    {user.active
                                                        ? "Deactivate"
                                                        : "Activate"}

                                                </button>

                                            )}


                                            {user.role !== "ADMIN" && (

                                                <button
                                                    className="delete-user-btn"
                                                    onClick={() =>
                                                        deleteUser(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            )}

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="no-users"
                                >
                                    No users found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Manageusers;