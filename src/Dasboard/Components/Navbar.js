import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../Axios/axios";
import { useSidebar } from "../Context/SidebarIsOpen";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  // async function getUser() {
  //   try {
  //     await Axios.get("user").then((data) => {
  //       setName(data.data.name);
  //       setRole(data.data.role);
  //     });
  //   } catch (err) {}
  // }
  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <nav className="d-flex justify-content-between align-items-center px-2 py-3">
        <div className="nav-logo d-flex align-items-center">
          <div
            className="left rounded-3 d-flex justify-content-center p-2 me-2 d-none d-md-block"
            style={{ background: "#eee" }}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
          <h5 className="m-0">My Dashboard</h5>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-none d-md-block">
            <ul className="m-0 d-flex">
              <li style={{ background: "#eee" }} className="p-2 rounded-3 me-3">
                <Link to="/users">
                  <FontAwesomeIcon icon={faUser} color="#333" />
                </Link>
              </li>
              <li style={{ background: "#eee" }} className="p-2 rounded-3 me-3">
                <Link to="/users">
                  <FontAwesomeIcon icon={faUser} color="#333" />
                </Link>
              </li>
              <li style={{ background: "#eee" }} className="p-2 rounded-3 me-3">
                <Link to="/users">
                  <FontAwesomeIcon icon={faUser} color="#333" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center mx-3">
            <div className="me-2 d-flex align-items-center">
              <img
                src={require("../avatarjpg.jpg")}
                alt="avatar"
                width="50px"
                height="50px"
                className="rounded-3"
              ></img>
              <div
                className="left rounded-3 d-flex justify-content-center p-3  d-md-none ms-3"
                style={{ background: "#0068ff" }}
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faBars} color="white" />
              </div>
            </div>
            <div className="d-none d-md-block">
              <p className="m-0 text-truncate " style={{ color: "#333" }}>
                {name}
              </p>
              <p
                className="m-0 small opacity-50 lh-1"
                style={{ color: "#333" }}
              >
                {role}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
