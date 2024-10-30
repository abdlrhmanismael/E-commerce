import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../Components/Table";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { useMemo, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LibraryTable from "../../Components/LibraryTable";
import TransferTableDate from "../../../helpers/TransferTableDate";

export default function Categories() {
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [refresh, setRefresh] = useState(false); // New refresh state

  const tableHeader = useMemo(
    () => [
      {
        accessorKey: "productTypeName",
        header: "Title",
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
              onClick={() => handleDelete(row.original.productTypeID)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <Link to={`${row.original.productTypeID}`} className="ms-3">
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
      await Axios.delete(`RefProductType/Delete?ID=${id}`);
      setRefresh((prev) => !prev); // Toggle refresh state to trigger re-fetch
      toast.success("Deletetd", {
        position: "top-right",
      });
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }
  return (
    <div className="categories flex-grow-1 w-100 ">
      <LibraryTable
        header={tableHeader}
        body="RefProductType/GetAll"
        page={page}
        limit={limit}
        setpage={setPage}
        search="title"
        refresh={refresh} // Pass refresh state as a prop
      />
      <ToastContainer />
    </div>
  );
}
