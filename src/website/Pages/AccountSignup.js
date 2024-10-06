import { Link } from "react-router-dom";

export default function AccountSignup() {
  return (
    <div className="d-flex justify-content-center account-sign p-5">
      <div>
        <h3>Create Account</h3>
        <p className="fs-5 account mt-3">
          Already Have Account?
          <Link to="/account/Login">Sign in</Link>
        </p>
        <form>
          <input type="text" className="web-input " placeholder="First Name" />
          <input type="text" className="web-input " placeholder="Last Name" />
          <input type="text" className="web-input " placeholder="Email" />
          <input type="password" className="web-input" placeholder="Password" />
        </form>
        <div className="d-flex justify-content-center">
          <button className="prim-btn bg-black border-0 mt-0 ">Create</button>
        </div>
      </div>
    </div>
  );
}
