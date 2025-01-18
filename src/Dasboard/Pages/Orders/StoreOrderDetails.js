import { useEffect, useState } from "react";
import { Axios } from "../../Axios/axios";
import { useParams } from "react-router-dom";
import TransferTableDate from "../../../helpers/TransferTableDate";

export default function StoreOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [statuses] = useState(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]); // Define possible statuses
    const [changes, setchanges] = useState(true)

    useEffect(() => {
        getOrderDetails();
    }, [changes]);

    const getOrderDetails = async () => {
        try {
            const { data } = await Axios.get(`/Order/GetOrderById?OrderID=${id}`);
            setOrder(data[0]);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const updateOrderStatus = async (newStatus) => {
        try {
            console.log(id);

            await Axios.put(`/Order/UpdateStatus?OrderID=${id}&orderStatus=${newStatus}`);
            setchanges(!changes)
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status. Please try again.");
        }
    };

    return order.length < 1 ? (
        <h1 className="text-black">Loading...</h1>
    ) : (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Order Invoice</h2>
                    <button className="btn btn-outline-secondary" onClick={() => window.print()}>
                        Print Invoice
                    </button>
                </div>
                <hr />
                <div className="row">
                    {/* Order Info */}
                    <div className="col-md-6">
                        <h5>Order Details</h5>
                        <p>
                            <strong>Order ID:</strong> {order.orderID}
                        </p>
                        <p>
                            <strong>Order Date:</strong> {TransferTableDate(order.orderDate)}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(e.target.value)}
                                className="form-select"
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>

                    {/* Billing & Shipping */}
                    <div className="col-md-6">
                        <h5>Billing & Shipping</h5>
                        <p>
                            <strong>Name:</strong> {order.customerName}
                        </p>
                        <p>
                            <strong>Address:</strong> {order.shippingAddress}
                        </p>
                        <p>
                            <strong>Phone:</strong> {order.customerPhone}
                        </p>
                    </div>
                </div>

                <hr />
                {/* Order Items */}
                <div>
                    <h5>Order Summary</h5>
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems &&
                                order.orderItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.productID}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.productPrice.toFixed(2)}</td>
                                        <td>${(item.quantity * item.productPrice).toFixed(2)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
