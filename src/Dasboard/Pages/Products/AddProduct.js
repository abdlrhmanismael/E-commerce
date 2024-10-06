import { useEffect, useRef, useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Axios/axios";

export default function AddProduct() {
  const { isSidebarOpen } = useSidebar();
  const [categories, setCategories] = useState([]);
  const [submit, setSubmit] = useState(true);
  const [form, setForm] = useState({
    category: "" || null,
    title: "",
    description: "",
    About: "",
    price: "",
    discount: "",
  });
  const j = useRef(-1);
  const [imgId, SetImgId] = useState([]);

  const [trashForm, setTrashForm] = useState({
    category: null,
    title: "sjiouwjs",
    description: "edrdf",
    About: "ededr",
    price: "2",
    discount: "3",
  });
  const progdiv = useRef([]);
  const [images, setimages] = useState([]);
  const [sent, setSent] = useState(false);
  const [sentButton, setSentButton] = useState(false);
  const [id, setId] = useState([]);
  //get categories
  async function getcat() {
    try {
      await Axios.get(`categories?limit=0&page=0`).then((data) => {
        setCategories(data.data);
      });
    } catch (err) {}
  }
  useEffect(() => {
    getcat();
  }, []);
  const showCategories = categories.map((category, key) => (
    <option key={key} value={category.id}>
      {category.title}
    </option>
  ));
  useEffect(() => {
    form.title === "" ||
    form.description === "" ||
    form.About === "" ||
    form.price === "" ||
    form.discount === "" ||
    images.length === 0
      ? setSubmit(false)
      : setSubmit(true);
  }, [
    form.title,
    form.description,
    form.About,
    form.price,
    form.discount,
    images,
  ]);

  //handle add Fakre product
  async function AddFakeProduct(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    try {
      let res = await Axios.post(`product/add`, trashForm);
      setId(res.data.id);
      setSent(true);
    } catch (err) {
      console.log(err);
    }
  }
  //handle Add Product
  async function AddProduct(e) {
    e.preventDefault();
    try {
      await Axios.post(`product/edit/${id}`, form);
      window.location.pathname = "/products";
    } catch (err) {
      console.log(err);
    } finally {
      setSentButton(true);
    }
  }
  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
  const showimages = images.map((image, key) => (
    <div className="card mb-3" key={key}>
      <div className="card-body d-flex ">
        <img
          src={URL.createObjectURL(image)}
          className="card-img-top me-3"
          alt="..."
          style={{ width: "80px" }}
        />
        <div className="image-info w-100">
          <div className="d-flex justify-content-between">
            <div>
              <p className="card-text">{image.name}</p>
              <p className="card-text">{formatBytes(image.size)}</p>
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-danger"
              onClick={() => DeleteImage(key)}
            />
          </div>

          <div
            className="progress"
            role="progressbar"
            aria-label="Example with label"
          >
            <div
              className="progress-bar"
              ref={(e) => (progdiv.current[key] = e)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  ));

  //hanle delete image
  async function DeleteImage(index) {
    try {
      await Axios.delete(`product-img/${imgId[index]}`);
      setimages((prevImages) => prevImages.filter((_, i) => i !== index));
      SetImgId((prevIds) => prevIds.filter((_, i) => i !== index));
      j.current -= 1;
    } catch (err) {
      console.log(err);
    }
  }

  //   handle add image
  async function AddImages(e) {
    setimages((prev) => [...prev, ...e.target.files]);
    const tempImages = e.target.files;
    const data = new FormData();
    for (let index = 0; index < tempImages.length; index++) {
      j.current = j.current + 1;
      data.append("image", tempImages[index]);
      data.append("product_id", id);
      try {
        let res = await Axios.post(`product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const loaded = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            progdiv.current[j.current].style.width = `${loaded}%`;
            progdiv.current[j.current].textContent = `${loaded}%`;
          },
        });

        SetImgId((prev) => [...prev, res.data.id]);
      } catch (err) {
        console.log(err);
      }
      // انتظار فاصل زمني بين رفع كل صورة
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }
  //handle form
  function handleForm(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  return (
    <>
      <div
        className="addcategories  justify-content-center  flex-grow-1  flex-column"
        style={{
          width: !isSidebarOpen ? "80%" : "0",
        }}
      >
        <h1 className="mb-3 p-3">Add Product!</h1>
        <form className="w-100 p-3" onSubmit={AddProduct}>
          <select
            className="form-select"
            defaultValue="0"
            onChange={AddFakeProduct}
            id="category"
          >
            <option value="0" disabled>
              Select Category
            </option>
            {showCategories}
          </select>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={form.title}
              onChange={handleForm}
              disabled={sent ? false : true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={form.description}
              onChange={handleForm}
              disabled={sent ? false : true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="About" className="form-label">
              About
            </label>
            <input
              type="text"
              className="form-control"
              id="About"
              required
              value={form.About}
              onChange={handleForm}
              disabled={sent ? false : true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={form.price}
              onChange={handleForm}
              disabled={sent ? false : true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">
              Discount
            </label>
            <input
              type="number"
              className="form-control"
              id="discount"
              required
              value={form.discount}
              onChange={handleForm}
              disabled={sent ? false : true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">
              Images
            </label>
            <input
              className="form-control"
              type="file"
              id="images"
              multiple
              onChange={AddImages}
              disabled={sent ? false : true}
            />
          </div>
          {/* image here */}
          {showimages}
          <div className="text-center ">
            <button
              type="submit"
              className="btn btn-primary fs-5"
              disabled={sent && submit && !sentButton ? false : true}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
