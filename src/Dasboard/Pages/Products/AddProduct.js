import { useEffect, useRef, useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const { isSidebarOpen } = useSidebar();
  const [categories, setCategories] = useState([]);
  const [submit, setSubmit] = useState(true);
  const [form, setForm] = useState({
    ProductTypeID: "" || null,
    Name: "",
    Description: "",
    SmallDescription: "",
    Price: "",
    Discount: "",
    SellerID: "731b1f15-1b34-4e13-a808-48f686deca21",
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
  const [images, setImages] = useState([]);
  const [sent, setSent] = useState(true);
  const [sentButton, setSentButton] = useState(false);
  const [id, setId] = useState([]);

  // Get categories
  async function getcat() {
    try {
      await Axios.get(`RefProductType/GetAll`).then((data) => {
        setCategories(data.data);
      });
    } catch (err) { }
  }

  useEffect(() => {
    getcat();
  }, []);

  const showCategories = categories.map((category, key) => (
    <option key={key} value={category.productTypeID}>
      {category.productTypeName}
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

  // Handle add Fake product
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

  // Handle Add Product
  async function AddProduct(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProductTypeID", form.ProductTypeID);
    formData.append("Name", form.Name);
    formData.append("Description", form.Description);
    formData.append("SmallDescription", form.SmallDescription);
    formData.append("Price", form.Price);
    formData.append("Discount", form.Discount);
    formData.append("SellerID", form.SellerID);
    images.forEach((image) => formData.append("ProductImages", image));
    setSentButton(true);

    try {
      await Axios.post("Product/Add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully!", { position: "top-right" });
      setForm({
        ProductTypeID: "" || null,
        Name: "",
        Description: "",
        SmallDescription: "",
        Price: "",
        Discount: "",
        SellerID: "731b1f15-1b34-4e13-a808-48f686deca21",
      });
      setImages([]);

    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`, { position: "top-right" });
      setSentButton(false);
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


        </div>
      </div>
    </div>
  ));

  // Handle delete image
  async function DeleteImage(index) {
    try {
      await Axios.delete(`product-img/${imgId[index]}`);
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      SetImgId((prevIds) => prevIds.filter((_, i) => i !== index));
      j.current -= 1;
    } catch (err) {
      console.log(err);
    }
  }

  // Handle add image
  function AddImages(e) {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  }
  // Handle form
  function handleForm(e) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  return (
    <>
      <div className="addcategories justify-content-center flex-grow-1 flex-column w-100 border border-dark-subtle rounded-3">
        <h3 className="mb-1 ms-2 p-2 text-black">Add Product!</h3>
        <form className="w-100 p-3" onSubmit={AddProduct}>
          <div className="row">
            <div className="">
              <label
                htmlFor="category"
                className="form-label text-black fw-bold"
              >
                Category
              </label>
              <select
                className="form-select"
                defaultValue="0"
                onChange={handleForm}
                id="ProductTypeID"
              >
                <option value="0">Select Category</option>
                {showCategories}
              </select>
            </div>

            <div className="mb-3 mt-2 ">
              <label htmlFor="title" className="form-label text-black fw-bold">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                required
                value={form.Name}
                onChange={handleForm}
                disabled={sent ? false : true}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label text-black fw-bold"
              >
                Description
              </label>
              <textarea
                className="form-control"
                id="Description"
                rows="3"
                required
                value={form.Description}
                onChange={handleForm}
                disabled={sent ? false : true}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label text-black fw-bold"
              >
                Small Description
              </label>
              <textarea
                className="form-control"
                id="SmallDescription"
                rows="3"
                required
                value={form.SmallDescription}
                onChange={handleForm}
                disabled={sent ? false : true}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label text-black fw-bold">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="Price"
                required
                value={form.Price}
                onChange={handleForm}
                disabled={sent ? false : true}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="discount"
                className="form-label text-black fw-bold"
              >
                Discount
              </label>
              <input
                type="number"
                className="form-control"
                id="Discount"
                required
                value={form.Discount}
                onChange={handleForm}
                disabled={sent ? false : true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Multiple file input example
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
                onChange={AddImages}
                disabled={sent ? false : true}
              />
            </div>

            <div className="mb-3">{showimages}</div>

            <button
              type="submit"
              className="btn btn-primary"
            // disabled={!submit || sentButton}
            >
              {sentButton ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
