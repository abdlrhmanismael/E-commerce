import { useEffect, useRef, useState } from "react";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { Axios } from "../../Axios/axios";
import { toast } from "react-toastify";

export default function Try() {
  const { isSidebarOpen } = useSidebar();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productTypeID: "" || null,
    name: "",
    description: "",
    smallDescription: "",
    price: "",
    discount: "",
    stockQuantity: null,
    productImages: [],
    sellerID: "731b1f15-1b34-4e13-a808-48f686deca21",
  });
  const j = useRef(-1);
  const progdiv = useRef([]);
  const [images, setimages] = useState([] || null);
  const { id } = useParams();
  const [deletedImageIds, setDeletedImageIds] = useState([]); // Add state for deleted image IDs
  const [loading, setLoading] = useState(true);

  //get categories
  async function getcat() {
    try {
      const response = await Axios.get(`RefProductType/GetAll`);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(categories);

  //get product
  async function getprod() {
    try {
      const response = await Axios.get(`Product/GetByID?ID=${id}`);
      setForm(response.data);

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
    <option key={key} value={category.productTypeID}>
      {category.productTypeName}
    </option>
  ));

  // Handle edit product
  async function EditProduct(e) {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => formData.append("ProductImages", image));
    const removeImagesIDs = deletedImageIds; // Example: [17, 11]

    // Construct the RemoveImagesIDs query parameter
    const removeImagesParams = removeImagesIDs
      .map((id) => `RemoveImagesIDs=${id}`)
      .join("&");

    const url = `https://thisisanecommerce.runasp.net/api/Product/Update?ID=${id}&${removeImagesParams}&&ProductTypeID=${form.productTypeID}&Name=${form.name}&Description=${form.description}&SmallDescription=${form.smallDescription}&Price=${form.price}&Discount=${form.discount}&stockQuantity=${form.stockQuantity}&SellerID=${form.sellerID}`;

    try {
      await Axios.put(url, formData, {
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
        stockQuantity: "",
        SellerID: "731b1f15-1b34-4e13-a808-48f686deca21",
      });
      window.location.pathname = "/products";
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`, { position: "top-right" });
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
  const showImagesFromServer = (form.productImages || []).map((image, key) => (
    <div className=" mb-3" key={key}>
      <div className=" d-flex ">
        <img
          src={image.imageUrl}
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
        </div>
      </div>
    </div>
  ));

  // Handle delete image from server from frontend
  function DeleteImagefromserver(index) {
    // Assuming each image has an `id`
    const imageId = form.productImages[index].productImageID;
    // console.log(imageId);

    // Update the deletedImageIds state with the new ID
    setDeletedImageIds((prev) => {
      // Create a new array with the added ID
      const updatedDeletedIds = [...prev, imageId];
      return updatedDeletedIds; // Return the updated array to set the state
    });

    setForm((prevForm) => ({
      ...prevForm,
      productImages: prevForm.productImages.filter((_, i) => i !== index),
    }));
    console.log(deletedImageIds);
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
      <div className="addcategories  justify-content-center  flex-grow-1  flex-column w-100">
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
            defaultValue={form.productTypeID}
            onChange={handleForm}
            id="ProductTypeID"
          >
            <option value="0">Select Category</option>
            {showCategories}
          </select>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={form.name}
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
              small Description
            </label>
            <input
              type="text"
              className="form-control"
              id="smallDescription"
              required
              value={form.smallDescription}
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
            <label htmlFor="stockQuantity" className="form-label">
              stockQuantity
            </label>
            <input
              type="number"
              className="form-control"
              id="stockQuantity"
              required
              value={form.stockQuantity}
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
