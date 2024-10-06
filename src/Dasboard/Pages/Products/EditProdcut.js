import { useEffect, useRef, useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { Axios } from "../../Axios/axios";

export default function Try() {
  const { isSidebarOpen } = useSidebar();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category: "" || null,
    title: "",
    description: "",
    About: "",
    price: "",
    discount: "",
  });
  const j = useRef(-1);
  const [imgIdFromServer, SetimgIdFromServer] = useState([]);
  const progdiv = useRef([]);
  const [imagesFromServer, setimagesFromServer] = useState([]);
  const [images, setimages] = useState([]);
  const { id } = useParams();
  const [imageId, setImageId] = useState([]);
  const [loading, setLoading] = useState(true);

  //get categories
  async function getcat() {
    try {
      const response = await Axios.get(`categories`);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(categories);

  //get product
  async function getprod() {
    try {
      const response = await Axios.get(`product/${id}`);
      setForm(response.data[0]);
      setimagesFromServer(response.data[0].images);
      response.data[0].images.forEach((image) =>
        SetimgIdFromServer((prev) => [...prev, image.id])
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getcat();
    getprod();
  }, []);

  const showCategories = categories.map((category, key) => (
    <option key={key} value={category.id}>
      {category.title}
    </option>
  ));

  // Handle edit product
  async function EditProduct(e) {
    e.preventDefault();

    // Upload images to backend when submitting
    for (let index = 0; index < images.length; index++) {
      const data = new FormData();
      j.current = j.current + 1;
      data.append("image", images[index]);
      data.append("product_id", id);
      try {
        const res = await Axios.post(`product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const loaded = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            progdiv.current[j.current].style.width = `${loaded}%`;
            progdiv.current[j.current].textContent = `${loaded}%`;
          },
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      await new Promise((resolve) => setTimeout(resolve, 800)); // Wait for 800 milliseconds between uploads
    }

    // Delete images from backend when submitting
    for (let index = 0; index < imageId.length; index++) {
      try {
        const res = await Axios.delete(`product-img/${imageId[index]}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

    // Edit form in backend when submitting
    try {
      await Axios.post(`product/edit/${id}`, form);
      window.location.pathname = "/products";
    } catch (err) {
      console.log(err);
    }
  }

  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Show server images
  const showImagesFromServer = imagesFromServer.map((image, key) => (
    <div className=" mb-3" key={key}>
      <div className=" d-flex ">
        <img
          src={image.image}
          className="card-img-top me-3"
          alt="..."
          style={{ width: "80px" }}
        />
        <div className="image-info w-100">
          <div className="d-flex justify-content-between">
            <FontAwesomeIcon
              icon={faTrash}
              className="text-danger"
              onClick={() => DeleteImagefromserver(key)}
            />
          </div>
        </div>
      </div>
    </div>
  ));

  // Show uploaded images
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
              onClick={() => setimages(images.filter((_, i) => key !== i))}
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

  // Handle delete image from server from frontend
  async function DeleteImagefromserver(index) {
    setImageId((prev) => [...prev, imagesFromServer[index].id]);
    setimagesFromServer((prev) => prev.filter((_, i) => i !== index));
  }

  // Handle add image
  function AddImages(e) {
    setimages((prev) => [...prev, ...e.target.files]);
  }

  // Handle form
  function handleForm(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <div
        className="addcategories  justify-content-center  flex-grow-1  flex-column"
        style={{
          opacity: isSidebarOpen ? "0" : "1",
          width: !isSidebarOpen ? "80%" : "0",
        }}
      >
        <h1
          className="mb-3 p-3"
          style={{
            opacity: isSidebarOpen ? "0" : "1",
          }}
        >
          Add Product!
        </h1>
        <form className="w-100 p-3" onSubmit={EditProduct}>
          <select
            className="form-select"
            defaultValue={form.category}
            id="category"
            onChange={handleForm}
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
            />
          </div>
          {/* Show server images */}
          {showImagesFromServer}
          {/* Show uploaded images */}
          {showimages}
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
