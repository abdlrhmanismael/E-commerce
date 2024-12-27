import { useEffect, useState } from "react";
import { Axios } from "../../../Dasboard/Axios/axios";
import Cookie from "cookie-universal";
import TransferTableDate from "../../../helpers/TransferTableDate";
import { Link } from "react-router-dom";

export default function Account() {
    const cookie = Cookie();
    const id = cookie.get("CustomerId");

    const sampleOrders = [
        {
            id: "ORD12345",
            date: "2024-12-23",
            total: 150.0,
            status: "Completed",
        },
        {
            id: "ORD12346",
            date: "2024-12-20",
            total: 85.5,
            status: "Pending",
        },
    ];
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getorders()
    }, []);
    const getorders = async () => {

        Axios.get(`/Order/GetCustomerOrders?CustomerID=${id}`).then((data) => { setOrders(data.data) })
    }


    return (
        <div className="container ">
            {/* Account Header */}
            <div className="">
                <div className=" text-center">
                    <h1 className="m-0">Account</h1>
                    <button className="btn btn-link text-decoration-none text-black">Log out</button>
                </div>
            </div>
            {/* Content Section */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Order History</h2>
                </div>
                {sampleOrders.length > 0 ? (
                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.orderID}>
                                    <td>{index + 1}</td>
                                    <td>{order.id}</td>
                                    <td>{TransferTableDate(order.orderDate)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        <span
                                            className={`badge ${order.status === "Completed"
                                                ? "bg-success"
                                                : order.status === "Pending"
                                                    ? "bg-warning text-dark"
                                                    : "bg-danger"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/order/${order.orderID}`} className="btn btn-sm btn-primary me-2">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="mt-4 text-center">
                        <h5>You haven't placed any orders yet.</h5>
                    </div>
                )}
            </div>

        </div>

    )
}