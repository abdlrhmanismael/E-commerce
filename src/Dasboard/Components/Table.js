import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../Context/GetWidth";
import { useSidebar } from "../Context/SidebarIsOpen";
import Pagination from "./Pagination";
import TransferDate from "../../helpers/TranferDate";
import { Axios } from "../Axios/axios";

export default function Table(props) {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const [usernow, setUserNow] = useState("");
  const [items, setItems] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const { isSidebarOpen } = useSidebar();
  const windowWidth = useWindowWidth();
  const [total, setotal] = useState(0);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const filtered = items.filter((item) =>
    item[props.search].toLowerCase().includes(search.toLowerCase())
  );
  const filteredDate = filtered.filter(
    (item) => TransferDate(item.created_at) === date
  );
  const whichData =
    filteredDate.length > 0 || date !== "" ? filteredDate : filtered;
  //get usernow
  async function getUsernow() {
    try {
      await Axios.get("user").then((data) => {
        setUserNow(data.data.name);
      });
    } catch (err) {
    } finally {
      setLoadingUser(false);
    }
  }

  //handle delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${props.del}/${id}`);
      setItems(items.filter((user) => user.id !== id));
    } catch (err) {}
  }
  useEffect(() => {
    getUsernow();
  }, []);
  //get items
  useEffect(() => {
    setLoadingTable(true);
    Axios.get(`${props.body}?limit=${props.limit}&page=${props.page}`)
      .then((data) => {
        setItems(data.data.data);
        setotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingTable(false));
  }, [props.page, props.limit, token, props.body]);

  const showHeader = props.header.map((title, key) => (
    <th key={key} scope="col">
      {title.name}
    </th>
  ));

  const showBody =
    whichData.length === 0 ? (
      <tr>
        <td className="text-center" colSpan={props.header.length + 1}>
          nothing found
        </td>
      </tr>
    ) : (
      whichData.map((item, key) => (
        <tr key={key}>
          {props.header.map((item2, key) => (
            <td key={key}>
              {item2.token === "created_at" || item2.token === "updated_at" ? (
                TransferDate(item[item2.token])
              ) : item[item2.token] === "1995" ? (
                "admin"
              ) : item[item2.token] === "1996" ? (
                "Writer"
              ) : item[item2.token] === "2001" ? (
                "User"
              ) : item[item2.token] === usernow ? (
                item[item2.token] + " (you)"
              ) : item2.token === "image" ? (
                <img
                  src={item.image}
                  alt="err"
                  style={{ width: "150px", height: "80px" }}
                />
              ) : item2.token === "images" ? (
                item.images.map((image, key) => (
                  <img
                    key={key}
                    src={image.image}
                    alt="err"
                    style={{ width: "150px", height: "80px" }}
                    className="mx-3"
                  />
                ))
              ) : (
                item[item2.token]
              )}
            </td>
          ))}
          <td>
            <span>
              {usernow !== item.name && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-danger me-2 fs-5"
                  onClick={() => handleDelete(item.id)}
                />
              )}
            </span>
            <span>
              <Link to={`${item.id}`}>
                <FontAwesomeIcon icon={faPenToSquare} className="fs-5" />
              </Link>
            </span>
          </td>
        </tr>
      ))
    );
  return (
    <>
      <div
        className={
          isSidebarOpen && windowWidth < 480
            ? "table-responsive w-100 vh-100"
            : "table-responsive p-2 w-100 vh-100"
        }
        style={{ display: isSidebarOpen && windowWidth < 480 && "none" }}
      >
        <div className="mb-3">
          <input
            className="form-control"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            id="exampleDataList"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-hover table-dark table-striped ">
          <thead>
            <tr>
              {showHeader}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingUser || loadingTable ? (
              <tr>
                <td className="text-center" colSpan={props.header.length + 1}>
                  Loading....
                </td>
              </tr>
            ) : (
              showBody
            )}
          </tbody>
        </table>
        <div style={{ display: isSidebarOpen && windowWidth < 480 && "none" }}>
          <Pagination
            itemsPerPage={props.limit}
            setpage={props.setpage}
            total={total}
            loadingTable={setLoadingTable}
          />
        </div>
      </div>
    </>
  );
}
