import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../Dasboard/Axios/axios";
import TransferTableDate from "../../helpers/TransferTableDate";
import Cookie from "cookie-universal";

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [activeProductID, setActiveProductID] = useState(null);
    const cookie = Cookie();
    const customerId = cookie.get("CustomerId");

    const handleStarClick = (rating) => {
        setStars(rating);
    };


    const handleSubmit = async () => {
        if (stars > 0 && review.trim()) {
            try {
                await Axios.post(`/Review/AddReview`, {
                    customerID: customerId,
                    productID: activeProductID,
                    rating: stars,
                    body: review,
                });
                setShowModal(false);
                setStars(0);
                setReview("");
                setActiveProductID(null); // Reset active product ID
            } catch (error) {
                if (error.response && error.response.data) {
                    // Show the error message from the response
                    alert(`${error.response.data}`);
                }
            }
        } else {
            alert("Please provide a star rating and review text.");
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, []);

    const getOrderDetails = async () => {
        try {
            const { data } = await Axios.get(`/Order/GetOrderById?OrderID=${id}`);
            setOrder(data[0]);
        } catch (error) {
            console.error("Error fetching order details:", error);
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
                                <th>Review</th>
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
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setActiveProductID(item.productID);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                        <div>
                            <p>
                                <strong>Total:</strong> ${order.totalPrice}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
                    tabIndex="-1"
                    aria-labelledby="ReviewModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-black">Product Review</h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <h6>Star Rating</h6>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`fs-3 ${star <= stars ? "text-warning" : "text-secondary"
                                                }`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleStarClick(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reviewText" className="form-label text-black">
                                        Your Review
                                    </label>
                                    <textarea
                                        id="reviewText"
                                        className="form-control"
                                        rows="4"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
