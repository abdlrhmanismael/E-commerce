import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryTable from "../../Components/LibraryTable";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { useMemo, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios/axios";
import TransferTableDate from "../../../helpers/TransferTableDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const { isSidebarOpen } = useSidebar();
  const [page, setpage] = useState(1);
  const [limit, settlimit] = useState(5);
  const [refresh, setRefresh] = useState(false); // New refresh state

  const tableHeader = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product Name",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
      },
      {
        accessorKey: "smallDescription",
        header: "Small Description",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },
      {
        accessorKey: "discount",
        header: "discount",
        size: 150,
      },
      {
        accessorKey: "productImages",
        header: "Images",
        size: 200,
        Cell: ({ row }) => (
          // Map over the images array to display each image
          <div style={{ display: "flex", gap: "5px" }}>
            {row.original.productImages.map((img) => (
              <img
                key={img.productImageID}
                src={img.imageUrl}
                alt="Product"
                style={{ width: "50px", height: "50px" }}
              />
            ))}
          </div>
        ),
      },
      {
        accessorKey: "sellerID",
        header: "sellerID",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        size: 150,
      },

      {
        accessorKey: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(row.original.productID)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <Link to={`${row.original.productID}`} className="ms-3">
              <FontAwesomeIcon icon={faPenToSquare} className="fs-5" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );
  async function handleDelete(id) {
    try {
      await Axios.delete(`Product/Delete?ID=${id}`);
      setRefresh((prev) => !prev); // Toggle refresh state to trigger re-fetch
      toast.success("Deletetd", {
        position: "top-right",
      });
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.success(`${err.response.data}`, {
        position: "top-right",
      });
    }
  }

  return (
    <div className="categories flex-grow-1 w-100">
      <LibraryTable
        header={tableHeader}
        body="Product/GetAll"
        page={page}
        limit={limit}
        setpage={setpage}
        search="name"
        refresh={refresh} // Pass refresh state as a prop
      />
      <ToastContainer />
    </div>
  );
}
