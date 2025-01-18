import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Dasboard/Context/Cart";
import { Axios } from "../../Dasboard/Axios/axios";
import Cookie from "cookie-universal";

export default function Checkout() {
    const cookie = Cookie();
    const id = cookie.get("CustomerId");
    const { cartitems, setCart } = useContext(CartContext);
    const total = cartitems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [shippingAddress, setShippingAddress] = useState('')
    const [err, seterr] = useState(false)

    const placeOrder = async () => {
        try {
            let res = await Axios.post('/Order/Add', {
                customerID: id,
                shippingAddress: shippingAddress,
                orderItems: cartitems
            })
            window.location.href = `/order-success/${res.data.orderID}`
            setCart([])
        } catch (err) {
            console.log(err);
            seterr(true)

        }
    }
    return (
        <div className="container mt-5">
            {err && <div className="alert alert-danger" role="alert">Please Set all inputs</div>}
            <div className="row">
                {/* Delivery Section */}
                <div className="col-md-7">
                    <div>
                        <h5>Delivery</h5>
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Address"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apartment"
                                    placeholder="Apartment, suite, etc."
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Phone number"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="col-md-5 my-3">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                {cartitems.map((item, key) => (
                                    <div className="" key={key}>
                                        <h5>{item.productName}</h5>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span>{item.quantity}</span>
                                            <strong>£{item.quantity * item.price}</strong>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span>Subtotal</span>
                                <strong>£{total}</strong>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span>Shipping</span>
                                <span className="text-muted">Enter shipping address</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span>Total</span>
                                <strong>EGP £{total}</strong>
                            </div>
                            <button type="button" class="btn btn-dark" onClick={() => placeOrder()}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


