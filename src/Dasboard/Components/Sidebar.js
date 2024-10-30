import { NavLink } from "react-router-dom";
import { SidebarLinks } from "./SidebarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import { useWindowWidth } from "../Context/GetWidth";
import { useSidebar } from "../Context/SidebarIsOpen";
import { Axios } from "../Axios/axios";

export default function Sidebar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const windowWidth = useWindowWidth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const showSidebarList = SidebarLinks.map(
    (link, key) =>
      link.role.includes(role) && (
        <NavLink
          className="rounded-3 d-flex align-items-center "
          key={key}
          to={link.link}
          style={{
            width: isSidebarOpen && "100%",
          }}
        >
          <FontAwesomeIcon
            icon={link.icon}
            style={{ marginRight: isSidebarOpen ? "1rem" : "0" }}
          />
          <span style={{ opacity: isSidebarOpen ? "1" : "0" }}>
            {isSidebarOpen && link.name}
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

  //handle logout
  async function handleLogout(e) {
    e.preventDefault();
    await Axios.get("logout")
      .then(() => (window.location.pathname = ""))
      .catch((err) => console.log(err));
  }
  //hide sidebar info

  return loading ? (
    <Loading />
  ) : (
    <div
      className="sidebar rounded-end-3 p-3 d-flex flex-column align-items-center"
      style={{
        width:
          isSidebarOpen && windowWidth <= 480
            ? "100%"
            : !isSidebarOpen && windowWidth <= 480
            ? "20%"
            : isSidebarOpen && windowWidth > 480
            ? "300px"
            : !isSidebarOpen && windowWidth > 480 && "80px",
        position: isSidebarOpen && windowWidth <= 480 ? "absolute" : "relative",
        height: isSidebarOpen && windowWidth <= 480 && "100%",
      }}
    >
      <div
        className="user "
        style={{
          display: isSidebarOpen ? "flex" : "none",
          opacity: isSidebarOpen ? "1" : "0",
        }}
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
              : "boda"}
          </p>
        </div>
      </div>
      <div className="w-100 d-flex flex-column justify-content-between h-100 ">
        <div className="sidebarList d-flex flex-column align-items-center">
          {showSidebarList}

          <div
            className="left rounded-3 d-flex justify-content-center  "
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faAngleLeft : faAngleRight}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleLogout}
            className="btn w-100 logout"
            style={{
              display: isSidebarOpen ? "block" : "none",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
