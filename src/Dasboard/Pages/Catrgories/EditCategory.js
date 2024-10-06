import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { Axios } from "../../Axios/axios";
import { useSidebar } from "../../Context/SidebarIsOpen";

export default function EditCategory() {
  const id = useParams();
  const cookie = Cookie();
  const [title, setTitle] = useState("");
  const [image, setimage] = useState("");
  const [form, setForm] = useState(new FormData());
  const token = cookie.get("Bearer");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const { isSidebarOpen } = useSidebar();

  //handle edit user
  async function EditCat(e) {
    e.preventDefault();
    try {
      await Axios.post(`category/edit/${id.id}`, form);
      window.location.pathname = "/categories";
    } catch (err) {
      console.log(err);
    }
  }
  //handle form
  function handleForm() {
    form.append("title", title);
    form.append("image", image);
  }
  useEffect(() => {
    handleForm();
  }, [title, image]);
  //get category
  async function GetCategory() {
    try {
      let res = await Axios.get(`category/${id.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTitle(res.data.title);
    } catch (err) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    GetCategory();
  }, []);

  return loading ? (
    <Loading />
  ) : err ? (
    <Navigate to="/404" />
  ) : (
    <>
      <div
        className="Edituser d-flex justify-content-center  flex-grow-1  flex-column overflow-hidden"
        style={{ width: !isSidebarOpen ? "80%" : "0" }}
      >
        <h1 className="mb-3">Welcome In Edit Page</h1>
        <form onSubmit={EditCat} className="w-100">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Default file input example
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
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
