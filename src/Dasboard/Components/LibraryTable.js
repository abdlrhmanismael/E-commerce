import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "cookie-universal";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../Context/GetWidth";
import { useSidebar } from "../Context/SidebarIsOpen";
import Pagination from "./Pagination";
import { Axios } from "../Axios/axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export default function LibraryTable(props) {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const [items, setItems] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const { isSidebarOpen } = useSidebar();
  const windowWidth = useWindowWidth();
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setLoadingTable(true);
    Axios.get(`${props.body}`)
      .then((data) => {
        setItems(data.data);
        // setTotal(data.data.total);
        console.log(items);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingTable(false));
  }, [props.page, props.limit, token, props.body, props.refresh]);

  const columns = useMemo(() => props.header, [props.header]);
  const table = useMaterialReactTable({
    columns,
    data: items,
  });

  return (
    <div>
      <MaterialReactTable table={table} />

    </div>
  );
}
