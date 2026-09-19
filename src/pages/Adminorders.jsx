import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Adminorders.css";
import api from "../services/api";

function Adminorders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const fetchOrders = async () => {

        try {

            const response =
                await api.get("/order/allorders");

                console.log(response.data.order);
            setOrders(response.data.order);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchOrders();

    }, []);


    const updateStatus = async (
        orderId,
        newStatus
    ) => {

        try {

            await api.put(
                `/order/status/${orderId}`,
                {
                    status: newStatus
                }
            );

            alert(
                "Order status updated successfully"
            );

            fetchOrders();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update order status"
            );
        }
    };


    const filteredOrders = orders.filter(
        (order) => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                order.id
                    .toString()
                    .includes(searchText)
                ||
                order.user?.username
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                statusFilter === "ALL" ||
                order.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        }
    );


    if (loading) {

        return (
            <div className="admin-orders">
                <h2>Loading orders...</h2>
            </div>
        );
    }


    return (

        <div className="admin-orders">

            <div className="orders-header">

                <h2>Manage Orders</h2>

                <span>
                    Total Orders: {orders.length}
                </span>

            </div>


            {/* SEARCH + FILTER */}

            <div className="orders-filter">

                <input
                    type="text"
                    placeholder="Search Order ID or Customer"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="ALL">
                        All Orders
                    </option>

                    <option value="PAID">
                        Paid
                    </option>

                    <option value="PROCESSING">
                        Processing
                    </option>

                    <option value="SHIPPED">
                        Shipped
                    </option>

                    <option value="DELIVERED">
                        Delivered
                    </option>

                    <option value="CANCELLED">
                        Cancelled
                    </option>

                    <option value="REFUNDED">
                        Refunded
                    </option>

                </select>

            </div>


            {/* TABLE */}

            <div className="orders-table">

                <table>

                    <thead>

                        <tr>

                            <th>Order</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredOrders.map(
                            (order) => (

                            <tr key={order.id}>

                                <td>
                                    #{order.id}
                                </td>


                                <td>
                                    {order.user?.username ||
                                        "N/A"}
                                </td>


                                <td>
                                    ₹
                                    {order.totalAmount}
                                </td>


                                <td>

                                    <span
                                        className="payment-id"
                                    >
                                        {order
                                            .razorpayPaymentId ||
                                            "-"}
                                    </span>

                                </td>


                                <td>

                                    <span
                                        className={
                                            `status ${order.status
                                                ?.toLowerCase()}`
                                        }
                                    >
                                        {order.status}
                                    </span>

                                </td>


                                <td>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/orders/${order.id}`
                                            )
                                        }
                                    >
                                        View
                                    </button>


                                    {order.status ===
                                        "PAID" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "PROCESSING"
                                                )
                                            }
                                        >
                                            Process
                                        </button>
                                    )}


                                    {order.status ===
                                        "PROCESSING" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "SHIPPED"
                                                )
                                            }
                                        >
                                            Ship
                                        </button>
                                    )}


                                    {order.status ===
                                        "SHIPPED" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.id,
                                                    "DELIVERED"
                                                )
                                            }
                                        >
                                            Deliver
                                        </button>
                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Adminorders;