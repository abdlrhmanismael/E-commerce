import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { Axios } from "../../Axios/axios";

export default function EditUser() {
  const { isSidebarOpen } = useSidebar();
  const id = useParams();
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    // role: "",
    phoneNumber: "",
  });
  console.log(form);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  //handle edit user
  async function EditUser(e) {
    e.preventDefault();
    try {
      const editFotm = {
        userRegister: {
          ...form,
        },
      };
      await Axios.put(`Admin/UpdateAdmin?ID=${id.id}`, editFotm);
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
      let res = await Axios.get(`Admin/GetByID?id=${id.id}`);
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
      <div className="Edituser  d-flex justify-content-center  flex-grow-1  flex-column overflow-hidden border border-dark-subtle p-3 rounded-3">
        <h3 className="mb-3 text-black">Welcome In Edit Page</h3>
        <form onSubmit={EditUser} className="w-100">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-black">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={form.firstName || ""}
              onChange={handleForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-black">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={form.lastName || ""}
              onChange={handleForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-black">
              UserName
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={form.userName || ""}
              onChange={handleForm}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black">
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
          {/* <label htmlFor="role" className="form-label">
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
            <option value="admin">Admin</option>
            <option value="1996">Writer</option>
            <option value="2001">User</option>
          </select> */}
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
