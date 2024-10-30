import { useEffect, useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { Axios } from "../../Axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategories() {
  const { isSidebarOpen } = useSidebar();
  const [title, setTitle] = useState("");
  const [image, setimage] = useState("");
  const [form, setForm] = useState({
    productTypeName: "",
  });

  //handle add user
  async function addcat(e) {
    e.preventDefault();

    try {
      await Axios.post(`/RefProductType/Add`, form);
      toast.success("Added", {
        position: "top-right",
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
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <>
      <div className="addcategories  justify-content-center  flex-grow-1  flex-column h-full overflow-hidden w-100 border border-dark-subtle rounded-3">
        <h3 className="mb-1 ms-2 p-2 text-black">Add Category!</h3>
        <form onSubmit={addcat} className="w-100 p-3">
          <div className="mb-3">
            <label htmlFor="Title" className="form-label text-black">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="productTypeName"
              value={form.productTypeName}
              onChange={handleForm}
              required
            />
          </div>

          <div className="text-center ">
            <button type="submit" className="btn btn-primary fs-5">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
