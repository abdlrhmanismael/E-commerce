import { useEffect, useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { Axios } from "../../Axios/axios";
export default function AddCategories() {
  const { isSidebarOpen } = useSidebar();
  const [title, setTitle] = useState("");
  const [image, setimage] = useState("");
  const [form, setForm] = useState(new FormData());

  form.append(title, "title");
  form.append(image, "image");
  //handle add user
  async function addcat(e) {
    e.preventDefault();

    try {
      await Axios.post(`category/add`, form);
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
  return (
    <>
      <div
        className="addcategories  justify-content-center  flex-grow-1  flex-column h-full overflow-hidden"
        style={{
          width: !isSidebarOpen ? "80%" : "0",
        }}
      >
        <h1 className="mb-3 p-3">Add Category!</h1>
        <form onSubmit={addcat} className="w-100 p-3">
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
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
