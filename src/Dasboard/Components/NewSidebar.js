import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { SidebarLinks } from "./SidebarLinks";
import {
  faAngleLeft,
  faBars,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../Axios/axios";
import { useSidebar } from "../Context/SidebarIsOpen";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function NewSidebar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  console.log(isSidebarOpen);
  const showSidebarList = SidebarLinks.map(
    (link, key) =>
      link.role.includes(role) && (
        <NavLink
          className="rounded-3 d-flex align-items-center overflow-hidden w-100 justify-content-center"
          key={key}
          to={link.link}
          style={{ height: "40px" }}
          onClick={() => toggleSidebar(true)} // Close sidebar on click
        >
          <FontAwesomeIcon icon={link.icon} />
          <span
            className={
              isSidebarOpen ? "ms-3 overflow-hidden" : "overflow-hidden"
            }
            style={{ width: isSidebarOpen ? "100%" : "0" }}
          >
            {link.name}
          </span>
        </NavLink>
      )
  );
  //get user
  // async function getUser() {
  //   try {
  //     await Axios.get("user").then((data) => {
  //       setName(data.data.name);
  //       setEmail(data.data.email);
  //       setRole(data.data.role);
  //     });
  //   } catch (err) {
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   getUser();
  // }, []);
  async function handleLogout(e) {
    e.preventDefault();
    await Axios.get("logout")
      .then(() => (window.location.pathname = ""))
      .catch((err) => console.log(err));
  }

  return loading ? (
    <Loading />
  ) : (
    <div
      className="sidebar rounded-end-3  d-flex flex-column justify-content-between position-absolute position-md-relative "
      style={{
        width: !isSidebarOpen && "80px",
        left: !isSidebarOpen && "-80px",
      }}
    >
      <div className="h-100">
        <div className="w-100 d-flex flex-column justify-content-between h-100 ">
          <div
            style={{ background: "#0068ff" }}
            className="d-flex overflow-hidden py-3 pe-3 align-items-center"
          >
            <img src={require("../pngwing.com.png")} alt="logo" width="70px" />
            <h3 className="fw-bold ps-3 text-white">E-commerce</h3>
          </div>
          <div className="p-3 d-flex flex-column justify-content-between h-100">
            <div className="sidebarList d-flex flex-column align-items-center">
              {showSidebarList}
            </div>

            <div>
              <div
                className="user overflow-hidden"
                style={{ width: isSidebarOpen ? "100%" : "0" }}
              >
                <div className="info">
                  <p className="name mb-1">{name}</p>
                  <p className="email">{email}</p>
                </div>
                <div className="role">
                  <p className="p-2 rounded-3">
                    {role === "1995"
                      ? "admin"
                      : role === "2000"
                      ? "User"
                      : role === "1996"
                      ? "writer"
                      : "error"}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleLogout}
                className="btn w-100 logout d-flex justify-content-center align-items-center "
              >
                <p
                  className="me-2 mt-0 mb-0 overflow-hidden"
                  style={{ width: isSidebarOpen ? "auto" : "0" }}
                >
                  Logout
                </p>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
