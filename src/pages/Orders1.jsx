import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../css/Orders1.css";

function Orders1() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

      const statuses = [
         "PAID",
         "PROCESSING",
         "SHIPPED",
         "DELIVERED"
      ];

const getStatusIndex = (status) => {
    return statuses.indexOf(status);
};

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            if (!userId) {
                console.log("User ID not found");
                return;
            }

            // const response = await api.get(`/order/user/${userId}`);
             const response = await api.get(`/order/my-orders`);

            console.log("My Orders:", response.data);

            setOrders(response.data || []);

        } catch (error) {

            console.error("Error fetching orders:", error);

        } finally {

            setLoading(false);

        }
    };


    const cancelOrder = async (orderId) => {
    try {
        const response = await api.put(`/order/cancel/${orderId}`);

        alert(response.data.message);

        // Refresh orders
        fetchOrders();

    } catch (error) {
        console.error(error);
        alert(
            error.response?.data?.message ||
            "Unable to cancel order"
        );
    }
};
    if (loading) {
        return (
            <div className="orders-container">
                <h2>Loading Orders...</h2>
            </div>
        );
    }


    return (

        <div className="orders-container">

            
          <h1>My Status</h1>

          {orders.status === "CANCELLED" ||
           orders.status === "REFUNDED" ? (

    <div className="cancelled-status">

        <div>✓ PAID</div>

        <div>✕ CANCELLED</div>

        {orders.status === "REFUNDED" && (
            <div>✓ REFUNDED</div>
        )}

    </div>

) : (
    // normal status flow
    
           <div className="status-flow">

    {statuses.map((status, index) => {

        const currentIndex =
            getStatusIndex(orders.status);

        const completed =
            index <= currentIndex;

        return (
            <div
                key={status}
                className={
                    completed
                        ? "status-step completed"
                        : "status-step"
                }
            >
                <div className="status-circle">
                    {completed ? "✓" : index + 1}
                </div>

                <span>{status}</span>
            </div>
        );
    })}



</div>
)}



            <h1>My Orders</h1>

            {orders.length === 0 ? (

                <div className="no-orders">

                    <h2>No Orders Found</h2>

                    <p>You haven't placed any orders yet.</p>

                    <button
                        onClick={() => navigate("/novels")}
                    >
                        Continue Shopping
                    </button>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id} 
                        >

                            <div className="order-header">

                                <div>
                                    <h2>
                                        Order #{order.id} 
                                    </h2>

                                    <p>
                                        <strong>Total:</strong>
                                        {" "}
                                        ₹{order.totalAmount}
                                    </p>
                                </div>
                               
                               <div>
                                <span className="status">
                                    {order.status}
                                    
                                </span>
                    
                                {order.status === "PAID" && (
                                    <span style={{color:'red',background:'pink'}}
                                    className="status" onClick={() => cancelOrder(order.id)}>
                                        CANCEL 
                                    </span>
                                )}
                                </div>
                            </div>


                            <div className="order-items">

                                {order.items?.map((item) => (

                                    <div
                                        className="order-item"
                                        key={item.id}
                                    >

                                        <img
                                            src={item.novel?.imageUrl}
                                            alt={item.novel?.title}
                                        />

                                        <div>

                                            <h3>
                                                {item.novel?.title}
                                            </h3>

                                            <p>
                                                Author:
                                                {" "}
                                                {item.novel?.author}
                                            </p>

                                            <p>
                                                Price:
                                                {" "}
                                                ₹{item.price}
                                            </p>

                                            <p>
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>
                                          

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            )}

            

        </div>

        
    );
}

export default Orders1;