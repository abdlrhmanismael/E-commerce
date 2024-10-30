import { useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { Axios } from "../../Axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUser() {
  const { isSidebarOpen } = useSidebar();
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  //handle edit user
  async function EditUser(e) {
    e.preventDefault();
    try {
      const newForm = {
        userRegister: {
          ...form,
          address: {
            street: "zag",
            city: "string",
            state: "string",
            postalCode: 12345,
            country: "string",
          },
          // dateCreated: "2024-10-29T17:45:06.747Z",
          // isActive: true,
        },
        // lastLogin: "2024-10-29T17:45:06.747Z",
        adminNotes: "string",
      };
      await Axios.post(`Admin/AdminRegister`, newForm);
      toast.success("Added", {
        position: "top-right",
      });
      setform({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(`${err.response.data}`, {
        position: "top-right",
      });
    }
  }
  //handle form
  function handleForm(e) {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <>
      <div className="  addcategories  justify-content-center  flex-grow-1  flex-column p-4 w-100 border border-dark-subtle rounded-3">
        <h3
          className="mb-1  p-2 text-black"
          style={{
            width: !isSidebarOpen ? "80%" : "100%",
          }}
        >
          Add Admin!
        </h3>
        <form onSubmit={EditUser} className="w-100" style={{}}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-black ">
              first Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={form.firstName || ""}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-black ">
              lastName
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={form.lastName || ""}
              onChange={handleForm}
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black">
              username
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              value={form.username || ""}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black">
              phone Number
            </label>
            <input
              type="username"
              className="form-control"
              id="phoneNumber"
              value={form.phoneNumber || ""}
              onChange={handleForm}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-black ">
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
      <ToastContainer />
    </>
  );
}
