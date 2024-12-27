import { useContext, useState } from "react";
import { CartContext } from "../../Dasboard/Context/Cart";
import { Axios } from "../../Dasboard/Axios/axios";
import Cookie from "cookie-universal";

export default function Checkout() {
    const cookie = Cookie();
    const id = cookie.get("CustomerId");
    const { cartitems, setCart } = useContext(CartContext);
    const total = cartitems.reduce((sum, item) => sum + 10 * item.quantity, 0);
    const [shippingAddress, setShippingAddress] = useState('')
    const placeOrder = async () => {
        try {
            await Axios.post('/Order/Add', {
                customerID: id,
                shippingAddress: shippingAddress,
                orderItems: cartitems
            })
            window.location.href = '/order-success'
            cartitems = []
        } catch (err) {
            console.log(err);

        }
    }
    console.log(shippingAddress);

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Delivery Section */}
                <div className="col-md-7">
                    <div className="mb-4">
                        <h5>Account</h5>
                        <p>test@gmail.com</p>
                    </div>

                    <div>
                        <h5>Delivery</h5>
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    placeholder="Address"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apartment" className="form-label">
                                    Apartment, suite, etc.
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apartment"
                                    placeholder="Apartment, suite, etc."
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Phone number"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="my-3">
                        <h5>Payment</h5>
                        <div class="form-check d-flex align-items-center">
                            <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" />
                            <label class="form-check-label fs-3 ms-2" for="flexRadioDisabled">
                                Cash On delivery
                            </label>
                        </div>
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
                                            <strong>£{item.quantity * 10}</strong>
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


