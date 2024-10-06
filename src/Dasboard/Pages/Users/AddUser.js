import { useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { Axios } from "../../Axios/axios";

export default function AddUser() {
  const { isSidebarOpen } = useSidebar();
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "0",
  });

  //handle edit user
  async function EditUser(e) {
    e.preventDefault();

    try {
      await Axios.post(`user/add`, form);
      window.location.pathname = "/users";
    } catch (err) {
      console.log(err);
    }
  }
  //handle form
  function handleForm(e) {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <>
      <div
        className="  addcategories  justify-content-center  flex-grow-1  flex-column"
        style={{
          width: !isSidebarOpen ? "80%" : "0",
        }}
      >
        <h1
          className=" "
          style={{
            width: !isSidebarOpen ? "80%" : "100%",
          }}
        >
          Add User!
        </h1>
        <form
          onSubmit={EditUser}
          className="w-100"
          style={{
            width: !isSidebarOpen ? "80%" : "0",
          }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name || ""}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={form.email || ""}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={form.password || ""}
              onChange={handleForm}
              required
            />
          </div>
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select mb-3"
            id="role"
            onChange={handleForm}
            value={form.role}
          >
            <option value="0" disabled>
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="1996">Writer</option>
            <option value="2001">User</option>
          </select>
          <div className="text-center ">
            <button
              type="submit"
              className="btn btn-primary fs-5"
              disabled={form.role === "0" ? true : false}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
