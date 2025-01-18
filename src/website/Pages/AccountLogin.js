import Cookie from "cookie-universal";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AccountLogin() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const cookie = Cookie();

  const [emaillerr, setEmailErr] = useState("");
  function handleForm(e) {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  //submit register request
  async function submit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://thisisanecommerce.runasp.net/api/Login/Login",
        form
      );
      cookie.set("CustomerAccount", res.data.token);
      cookie.set("CustomerId", res.data.id);
      window.location.pathname = "/Home";

    } catch (err) {
      setEmailErr(err.response.data);
    }
  }
  return (
    <div className="d-flex justify-content-center account-sign p-5">
      <div>
        <h3>Login</h3>
        <p className="fs-5 account mt-3">
          Don't have an account yet?
          <Link to="/account/signup">Create Account</Link>
        </p>
        <p className="text-danger">{emaillerr}</p>
        <form onSubmit={submit}>
          <input required
            value={form.email}
            onChange={handleForm}
            type="text" className="web-input " placeholder="Email" id="email"
          />
          <input required
            value={form.password}
            onChange={handleForm}
            type="password" className="web-input" placeholder="Password" id="password"
          />
          <div className="d-flex justify-content-center">
            <button className="prim-btn bg-black border-0 mt-0 ">SIGN IN</button>
          </div>
        </form>

      </div>
    </div>
  );
}
