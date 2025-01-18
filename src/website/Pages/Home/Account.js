import { useEffect, useState } from "react";
import { Axios } from "../../../Dasboard/Axios/axios";
import Cookie from "cookie-universal";
import TransferTableDate from "../../../helpers/TransferTableDate";
import { Link } from "react-router-dom";

export default function Account() {
    const cookie = Cookie();
    const id = cookie.get("CustomerId");
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getorders()
    }, []);
    const getorders = async () => {
        Axios.get(`/Order/GetCustomerOrders?CustomerID=${id}`).then((data) => { setOrders(data.data) })
        setLoading(false)
    }
    const logout = () => {
        cookie.remove("CustomerAccount");
        cookie.remove("CustomerId");
        window.location.pathname = "/Home";
    }


    return (
        <div className="container ">
            {/* Account Header */}
            <div className="">
                <div className=" text-center">
                    <h1 className="m-0">Account</h1>
                    <button className="btn btn-link text-decoration-none text-black" onClick={() => logout()}>Log out</button>
                </div>
            </div>
            {/* Content Section */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Order History</h2>
                </div>
                {orders.length === 0 && loading === false ? (
                    <div>Loading..</div>
                )
                    :
                    orders.length > 0 ? (
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
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