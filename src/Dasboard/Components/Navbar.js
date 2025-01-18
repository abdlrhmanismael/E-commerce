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

          </div>
          <div className="d-flex align-items-center mx-3">
            <div className="me-2 d-flex align-items-center">

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
