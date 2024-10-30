import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { Axios } from "../../Axios/axios";
import { toast, ToastContainer } from "react-toastify";

export default function EditCategory() {
  const id = useParams();
  const cookie = Cookie();
  const [title, setTitle] = useState("");
  const [form, setForm] = useState({
    productTypeName: "",
  });
  const token = cookie.get("Bearer");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  //handle edit user
  async function EditCat(e) {
    e.preventDefault();
    try {
      await Axios.put(`RefProductType/Update?ID=${id.id}`, form);
      toast.success("Added", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
    }
  }
  //handle form
  function handleForm(e) {
    setForm(() => ({ [e.target.id]: e.target.value }));
  }

  //get category
  async function GetCategory() {
    try {
      let res = await Axios.get(`RefProductType/GeyByID?ID=${id.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      form.productTypeName = res.data.productTypeName;
    } catch (err) {
      setErr(true);
      toast.error(`${err.response.data}`, {
        position: "top-right",
      });
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
      <div className="Edituser d-flex justify-content-center  flex-grow-1  flex-column overflow-hidden">
        <h1 className="mb-3">Welcome In Edit Page</h1>
        <form onSubmit={EditCat} className="w-100">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              title
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
