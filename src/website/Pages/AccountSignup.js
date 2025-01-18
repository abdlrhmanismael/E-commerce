import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AccountSignup() {
  const [form, setForm] = useState({
    userRegister: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "010694429",
      password: "",
      address: {
        street: "test",
        city: "test",
        state: "test",
        postalCode: 12345,
        country: "test"
      },
      dateCreated: "2024-12-10T07:11:55.431Z",
      isActive: true
    }
  });
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);

  function handleForm(e) {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      userRegister: {
        ...prev.userRegister,
        [id]: value // Update the specific nested property
      }
    }));
  }

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("https://thisisanecommerce.runasp.net/api/Customer/CustomerRegister", form);
      window.location.pathname = "/account/login";
    } catch (err) {
      setEmailErr(err.respons.data);
    }
  }

  return (
    <div className="d-flex justify-content-center account-sign p-5">
      <div>
        <h3>Create Account</h3>
        <p className="fs-5 account mt-3">
          Already Have Account?
          <Link to="/account/Login">Sign in</Link>
        </p>
        <p className="text-danger">{emailErr}</p>

        <form onSubmit={submit}>
          <input
            id="firstName"
            required
            value={form.userRegister.firstName}
            onChange={handleForm}
            type="text"
            className="web-input"
            placeholder="First Name"
          />
          <input
            id="lastName"
            required
            value={form.userRegister.lastName}
            onChange={handleForm}
            type="text"
            className="web-input"
            placeholder="Last Name"
          />
          <input
            id="email"
            required
            value={form.userRegister.email}
            onChange={handleForm}
            type="text"
            className="web-input"
            placeholder="Email"
          />
          <input
            id="username"
            required
            value={form.userRegister.username}
            onChange={handleForm}
            type="text"
            className="web-input"
            placeholder="UserName"
          />
          <input
            id="password"
            required
            value={form.userRegister.password}
            onChange={handleForm}
            type="password"
            className="web-input"
            placeholder="Password"
          />
          <div className="d-flex justify-content-center">
            <button className="prim-btn bg-black border-0 mt-0">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
