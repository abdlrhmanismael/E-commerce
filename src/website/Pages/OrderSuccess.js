
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Axios } from '../../Dasboard/Axios/axios';
export default function OrderSuccess() {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = useParams();
    useEffect(() => {
        getOrderDetails();
    }, []);
    const getOrderDetails = async () => {
        try {
            let res = await Axios.get(`/Order/GetOrderById?OrderID=${id.id}`)
            setOrder(res.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }

    return loading === false ? (<div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="alert alert-success text-center" role="alert">
                    <h1 className="display-4">Order Successful!</h1>
                    <p className="lead">Your order has been successfully placed. Thank you for shopping with us.</p>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Order Summary</h4>
                        <ul className="list-unstyled">
                            <li><strong>Order Number:</strong> {order[0].orderID}</li>
                            <li><strong>Total:</strong> ${order[0].totalPrice}</li>
                            <li><strong>Shipping Address:</strong>{order[0].shippingAddress}</li>
                        </ul>
                        <div className="d-grid gap-2">
                            <Link to="/home" className="btn btn-primary btn-lg">
                                Go to Homepage
                            </Link>
                            <Link to="/account" className="btn btn-outline-primary btn-lg mt-2">
                                View My Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ) : (<div>Loading..</div>)
}