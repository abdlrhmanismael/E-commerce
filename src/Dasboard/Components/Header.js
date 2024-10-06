import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark position-static">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Dashboard
        </Link>
        <div>
          <Link to="/login" className="primary-btn">
            Login
          </Link>
          <Link to="/Register" className="primary-btn">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
