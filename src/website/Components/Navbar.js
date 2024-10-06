import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowWidth } from "../../Dasboard/Context/GetWidth";
import { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { Axios } from "../../Dasboard/Axios/axios";

export default function Navbar(props) {
  const windowwidth = useWindowWidth();
  const [search, setSearch] = useState(false);
  const refsearch = useRef();
  const categoriesRef = useRef(null);
  const dropRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCardOpen, setisCardOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  //get categorios
  useEffect(() => {
    Axios.get("/categories").then((data) => setCategories(data.data));
  }, []);
  const showCategories = categories.map((category, key) => (
    <li className="text-black" key={key}>
      {category.title}
    </li>
  ));
  const showSmallCategories = categories.map((category, key) => (
    <li className="text-black" key={key}>
      {category.title.toUpperCase()}
    </li>
  ));
  // to hide search div in small and mdeuim screens
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 990) {
        if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearch(true);
        }
      } else {
        if (search) {
          setSearch(false);
          setIsSearchOpen(true);
        }
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSearchOpen, search]);

  //to show the search div
  console.log(products);
  function dropmenuaddclas() {
    if (
      !categoriesRef["current"].classList.contains("is-active") ||
      !dropRef["current"].classList.contains("active")
    ) {
      setTimeout(() => {
        categoriesRef["current"].classList.add("is-active");
      }, 200);
      dropRef["current"].classList.add("active");
      dropRef["current"].classList.remove("opacity-0");
    }
  }
  function dropmenuremoveclass() {
    categoriesRef["current"].classList.remove("is-active");
    dropRef["current"].classList.remove("active");
    dropRef["current"].classList.add("opacity-0");
  }
  //GET SEARCH CONTENT
  async function getSearch() {
    let res = await Axios.get("/products");
    setProducts(res.data);
  }
  useEffect(() => {
    getSearch();
  }, []);
  const filterSearch = searchFilter
    ? products.filter((item) =>
        item.title.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : [];

  const showSearchFilter = filterSearch.map((product, key) => (
    <div
      className="search-card d-flex align-items-center col-12 col-md-6"
      key={key}
    >
      <div>
        <img
          src={product.images[0].image}
          alt="img"
          width={40}
          height={80}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="ms-3">
        <p className="text-secondary mb-0">e-commerce</p>
        <p className="text-black mb-0">{product.title}</p>
        <p className="text-black">{product.price} LE</p>
      </div>
    </div>
  ));

  return (
    <>
      <div
        className={props.site ? "header w-100 border-bottom" : "header w-100 "}
        style={{ position: props.position }}
      >
        <nav
          className="navbar"
          ref={refsearch}
          style={{
            background: search && "white",
            color: props.site === "true" && "black",
          }}
        >
          {search && windowwidth > 990 ? (
            <div className="container">
              <div className="w-100 d-flex flex-column position-relative my-4 ">
                <div className="position-relative">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="position-absolute "
                    style={{
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "gray",
                    }}
                  />
                  <input
                    className="form-control w-100 ps-5"
                    id="bigSearch"
                    placeholder="Search"
                    onChange={(e) => setSearchFilter(e.target.value)}
                    value={searchFilter}
                  />
                  <FontAwesomeIcon
                    icon={faX}
                    className="position-absolute text-black"
                    style={{
                      right: "10px",
                      top: "10px",
                    }}
                    onClick={() => setSearch(false)}
                  />
                </div>

                <div className="search-data mt-3">
                  <div className="row">{showSearchFilter}</div>
                </div>
              </div>
            </div>
          ) : (
            windowwidth >= 990 && (
              <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className=" me-3 navicon"
                      onClick={() => setSearch(true)}
                    />
                  </div>
                  <div>
                    <Link to="/home">
                      <img
                        src={require("../images/logo.png")}
                        alt="logo"
                        width="70px"
                      />
                    </Link>
                  </div>

                  <div className="d-flex align-items-center">
                    <Link
                      to="account/login"
                      className={`${props.site === "true" && "text-black"}`}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className=" me-3 navicon"
                      />
                    </Link>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      onClick={() => setisCardOpen(true)}
                      className=" me-3 navicon"
                    />
                  </div>
                </div>
              </div>
            )
          )}

          {windowwidth < 990 && (
            <div className="container">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <FontAwesomeIcon
                    icon={faBars}
                    className="navicon"
                    onClick={() => setIsOffcanvasOpen(true)}
                  />
                </div>
                <div>
                  <Link to="/home">
                    <img
                      src={require("../images/logo.png")}
                      alt="logo"
                      width="70px"
                    />
                  </Link>
                </div>

                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className=" me-3 navicon"
                    onClick={() => setIsSearchOpen(true)}
                  />
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="navicon"
                    onClick={() => setisCardOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}
        </nav>
        {!search && windowwidth >= 990 && (
          <div className="info d-flex justify-content-center  ">
            <ul
              className="d-flex align-items-center "
              style={{
                listStyle: "none",
                color: props.site === "true" && "black",
              }}
            >
              <li className="me-5 fs-5">
                <Link
                  to="/Home"
                  className="catinfo"
                  style={{ color: props.site === "true" && "black" }}
                >
                  HOME
                </Link>
              </li>
              <div
                onMouseOver={dropmenuaddclas}
                onMouseLeave={dropmenuremoveclass}
              >
                <li className="me-5 fs-5">
                  <button
                    type="button"
                    className="btn fs-5 p-0 border-0 catinfo "
                    style={{ color: props.site === "true" && "black" }}
                  >
                    CATEGORIES
                  </button>
                  <div className="drop-menu" ref={dropRef}>
                    <ul className=" rounded-0  catlist" ref={categoriesRef}>
                      {showCategories}
                    </ul>
                  </div>
                </li>
              </div>

              <li className="me-5 fs-5">
                <Link
                  to="/sales"
                  className="catinfo"
                  style={{ color: props.site === "true" && "black" }}
                >
                  SALES
                </Link>
              </li>
              <li className="me-5 fs-5">
                <Link
                  to="/contactus"
                  className="catinfo"
                  style={{ color: props.site === "true" && "black" }}
                >
                  CONTACT US
                </Link>
              </li>
              <li className="me-5 fs-5">
                <Link
                  to="/findus"
                  className="catinfo"
                  style={{ color: props.site === "true" && "black" }}
                >
                  FIND STORE
                </Link>
              </li>
              <li className="me-5 fs-5">
                <Link
                  to="/news"
                  className="catinfo"
                  style={{ color: props.site === "true" && "black" }}
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div>
          <Offcanvas
            show={isOffcanvasOpen}
            onHide={() => setIsOffcanvasOpen(false)}
            placement="start"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column justify-content-between h-100">
              <ul style={{ listStyle: "none" }} className="p-0">
                <li className="my-3 fs-4 border-bottom pb-3">Home</li>
                <li
                  className="my-3 fs-4 border-bottom pb-3"
                  onClick={() => setIsCategoryOpen(true)}
                >
                  CATEGORIES
                </li>
                <li className="my-3 fs-4 border-bottom pb-3">SALES</li>
                <li className="my-3 fs-4 border-bottom pb-3">CONTACT US</li>
              </ul>
              <Link
                to="/account/login"
                className="d-flex align-items-center border-top pt-3"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon icon={faUser} className="me-3" />
                Login
              </Link>
            </Offcanvas.Body>
          </Offcanvas>
          <Offcanvas
            show={isCategoryOpen}
            onHide={() => {
              setIsCategoryOpen(false);
              setIsOffcanvasOpen(false);
            }}
            placement="start"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="category-offcanvas">
              <ul>{showSmallCategories}</ul>
            </Offcanvas.Body>
          </Offcanvas>
          <Offcanvas
            show={isSearchOpen}
            placement="top"
            onHide={() => {
              setIsSearchOpen(false);
            }}
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="category-offcanvas">
              <div className="w-100 position-relative my-4">
                <div className="position-relative w-100">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="position-absolute"
                    style={{
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    className="form-control w-100 ps-5"
                    id="smallseach"
                    placeholder="Search"
                    onChange={(e) => setSearchFilter(e.target.value)}
                    value={searchFilter}
                  />
                </div>
                <div className="row">{showSearchFilter}</div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Offcanvas
            show={isCategoryOpen}
            onHide={() => {
              setIsCategoryOpen(false);
              setIsOffcanvasOpen(false);
            }}
            placement="start"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="category-offcanvas">
              <ul>{showSmallCategories}</ul>
            </Offcanvas.Body>
          </Offcanvas>

          <Offcanvas
            show={isCardOpen}
            placement="end"
            onHide={() => {
              setisCardOpen(false);
            }}
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="category-offcanvas">
              <div>
                <h1>card</h1>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}
