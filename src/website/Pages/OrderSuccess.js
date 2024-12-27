
import { Link } from 'react-router-dom';
export default function OrderSuccess() {
    return (
        <div className="container py-5">
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
                                <li><strong>Order Number:</strong> #123456</li>
                                <li><strong>Total:</strong> $199.99</li>
                                <li><strong>Shipping Address:</strong> 123 Main St, City, Country</li>
                            </ul>
                            <div className="d-grid gap-2">
                                <Link to="/" className="btn btn-primary btn-lg">
                                    Go to Homepage
                                </Link>
                                <Link to="/orders" className="btn btn-outline-primary btn-lg mt-2">
                                    View My Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}