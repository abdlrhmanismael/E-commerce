import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryTable from "../../Components/LibraryTable";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { useMemo, useState } from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Axios/axios";
import { Link } from "react-router-dom";
import TransferTableDate from "../../../helpers/TransferTableDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const { isSidebarOpen } = useSidebar();
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(3);
  const [refresh, setRefresh] = useState(false); // New refresh state

  const tableHeader = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "last Name",
        size: 150,
      },
      {
        accessorKey: "userName",
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
        Cell: ({ row }) => (
          <span>Admin</span>
        ),
      },
      {
        accessorKey: "dateCreated",
        header: "Created At",
        size: 150,
        Cell: ({ row }) => (
          <div>{TransferTableDate(row.original.dateCreated)}</div>
        ),
      },
      {
        accessorKey: "lastLogin",
        header: "last Login",
        size: 150,
        Cell: ({ row }) => (
          <div>{TransferTableDate(row.original.lastLogin)}</div>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 100,
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(row.original.adminId)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <Link to={`${row.original.adminId}`} className="ms-3">
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
      await Axios.delete(`Admin/DeleteAdmin?ID=${id}`);
      setRefresh((prev) => !prev); // Toggle refresh state to trigger re-fetch
      toast.success("Deletetd", {
        position: "top-right",
      });
    } catch (err) {
      console.error("error:", err);
    }
  }

  return (
    <div className="usersPage flex-grow-1 w-100">
      <LibraryTable
        header={tableHeader}
        body="Admin/GetAll"
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
