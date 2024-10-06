import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { Axios } from "../../Axios/axios";

export default function EditUser() {
  const { isSidebarOpen } = useSidebar();
  const id = useParams();
  const [form, setform] = useState({
    name: "",
    email: "",
    role: "",
  });
  console.log(form);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  //handle edit user
  async function EditUser(e) {
    e.preventDefault();
    try {
      await Axios.post(`user/edit/${id.id}`, form);
      window.location.pathname = "/users";
    } catch (err) {
      console.log(err);
    }
  }
  //handle form
  function handleForm(e) {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function GetUser() {
    try {
      let res = await Axios.get(`user/${id.id}`);
      setform(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErr(true);
    } finally {
    }
  }
  useEffect(() => {
    GetUser();
  }, []);

  return loading ? (
    <Loading />
  ) : err ? (
    <Navigate to="/404" />
  ) : (
    <>
      <div
        className="Edituser  d-flex justify-content-center  flex-grow-1  flex-column overflow-hidden"
        style={{ width: !isSidebarOpen ? "80%" : "0" }}
      >
        <h1 className="mb-3">Welcome In Edit Page</h1>
        <form onSubmit={EditUser} className="w-100">
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
            <button type="submit" className="btn btn-primary fs-5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
