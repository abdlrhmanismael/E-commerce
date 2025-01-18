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

export default function Orders() {
    const { isSidebarOpen } = useSidebar();
    const [page, setpage] = useState(1);
    const [limit, setlimit] = useState(3);
    const [refresh, setRefresh] = useState(false); // New refresh state

    const tableHeader = useMemo(
        () => [
            {
                accessorKey: "orderID",
                header: "order ID",
                size: 150,
            },
            {
                accessorKey: "customerName",
                header: "customer Name",
                size: 150,
            },
            {
                accessorKey: "status",
                header: "Order Status",
                size: 150,
            },


            {
                accessorKey: "orderDate",
                header: "order Date",
                size: 150,
                Cell: ({ row }) => (
                    <div>{TransferTableDate(row.original.orderDate)}</div>
                ),
            },
            {
                accessorKey: "actions",
                header: "Actions",
                size: 100,
                Cell: ({ row }) => (
                    <div className="d-flex align-items-center">
                        <Link to={`/store/order/${row.original.orderID}`} className="ms-3">
                            <FontAwesomeIcon icon={faPenToSquare} className="fs-5" />
                        </Link>
                    </div>
                ),
            },
        ],
        []
    );


    return (
        <div className="usersPage flex-grow-1 w-100">
            <LibraryTable
                header={tableHeader}
                body="Order/GetAllOrders"
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
