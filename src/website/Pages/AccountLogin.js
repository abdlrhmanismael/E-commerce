import { Link } from "react-router-dom";

export default function AccountLogin() {
  return (
    <div className="d-flex justify-content-center account-sign p-5">
      <div>
        <h3>Login</h3>
        <p className="fs-5 account mt-3">
          Don't have an account yet?
          <Link to="/account/signup">Create Account</Link>
        </p>
        <form>
          <input type="text" className="web-input " placeholder="Email" />
          <input type="password" className="web-input" placeholder="Password" />
        </form>
        <div className="d-flex justify-content-center">
          <button className="prim-btn bg-black border-0 mt-0 ">SIGN IN</button>
        </div>
      </div>
    </div>
  );
}
