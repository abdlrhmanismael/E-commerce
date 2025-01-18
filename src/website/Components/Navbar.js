import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowWidth } from "../../Dasboard/Context/GetWidth";
import { useContext, useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { Axios } from "../../Dasboard/Axios/axios";
import { CartContext } from "../../Dasboard/Context/Cart";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar(props) {
  const windowwidth = useWindowWidth();
  const [search, setSearch] = useState(false);
  const refsearch = useRef();
  const [categories, setCategories] = useState([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCardOpen, setisCardOpen] = useState(false);
  const { cartitems, setCart } = useContext(CartContext);
  const cookie = Cookie();
  const id = cookie.get("CustomerId");
  const token = cookie.get("CustomerAccount");
  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //get categorios
  useEffect(() => {
    Axios.get("/RefProductType/GetAll").then((data) => setCategories(data.data));
    Axios.get(`/cart/GetCartByCustomerID?customerID=${id}`).then((data) => setCart(data.data.cartItems));
  }, []);

  const showSmallCategories = categories.map((category, key) => (
    <li className="text-black" key={key}>
      {category.productTypeName.toUpperCase()}
    </li>
  ));

  // to hide search div in small and mdeuim screens

  const cartCounter = async (increase, product) => {
    if (increase === true) {
      try {
        const cartItem = {
          customerID: id,
          productID: product.productID,
          quantity: 1, // Default quantity
        };
        await Axios.post('/Cart/AddorupdateCart', cartItem)
        let cart = await Axios.get(`/cart/GetCartByCustomerID?customerID=${id}`)
        setCart(cart.data.cartItems)
      } catch (err) {
        console.log(err);
        toast.error(err.response.data, {
          position: "bottom-left",
        });

      }
    }
    else if (increase === false && product.quantity > 1) {
      try {
        const cartItem = {
          customerID: id,
          productID: product.productID,
          quantity: -1, // Default quantity
        };
        await Axios.post('/Cart/AddorupdateCart', cartItem)
        let cart = await Axios.get(`/cart/GetCartByCustomerID?customerID=${id}`)
        setCart(cart.data.cartItems)
      } catch (err) {
        console.log(err);
      }
    } else if (increase === false && product.quantity === 1) {
      try {
        const cartItem = {
          customerID: id,
          productID: product.productID,
          quantity: -1, // Default quantity
        };
        await Axios.post('/Cart/AddorupdateCart', cartItem)
        let cart = await Axios.get(`/cart/GetCartByCustomerID?customerID=${id}`)
        setCart(cart.data.cartItems)

      } catch (err) {
        console.log(err);
      }
    }
  }

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(searchFilter);
    }, 1000); // 1 second delay

    return () => {
      clearTimeout(handler); // Cleanup timeout on input change
    };
  }, [searchFilter]);

  // Fetch products based on the debounced filter
  useEffect(() => {
    if (debouncedFilter.trim() === "") {
      setSearchResults([]); // Clear results if input is empty
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await Axios.post(`/Product/search`, {
          query: debouncedFilter,
        });
        setSearchResults(response.data.items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedFilter]);


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
                      onClick={() => setIsSearchOpen(true)}
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
                    {token && (
                      <Link
                        to="/account"
                        className={`${props.site === "true" && "text-black"}`}
                      >

                        <FontAwesomeIcon icon={faUser} className="me-3" />
                      </Link>
                    )}
                    {!token && (
                      <Link
                        to="/account/login"
                        className={`${props.site === "true" && "text-black"}`}
                        style={{ textDecoration: "none" }}
                      >
                        <FontAwesomeIcon icon={faUser} className="me-3" />
                      </Link>
                    )}
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

              >

              </div>


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
              {token && (
                <Link
                  to="/account"
                  className={`${props.site === "true" && "text-black"}`}
                >

                  <FontAwesomeIcon icon={faUser} className="me-3" />
                </Link>
              )}
              {!token && (
                <Link
                  to="/account/login"
                  className={`${props.site === "true" && "text-black"}`}
                  style={{ textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faUser} className="me-3" />
                </Link>
              )}
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
                <div className="row">
                  {loading ? (
                    <p>Loading...</p>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <a href={`/collection/${product.productID}`} className="col-12 mt-2 text-decoration-none text-black" key={product.id}>
                        <div className="product-item d-flex">
                          <div>
                            <img
                              src={product.productImages[0].imageUrl}
                              alt="product"
                              width="70px"
                              height="70px"
                              className="image-fluid"
                            />
                          </div>
                          <div className="mx-2">
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p>No results found.</p>
                  )}
                </div>
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
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column justify-content-between h-100">
              <div>
                <div className="items">
                  {cartitems && cartitems.map((item, key) => (
                    <div className="" key={key}>
                      <h1 className="text-black">{item.productName}</h1>
                      <div className="d-flex justify-content-between">
                        <div className="counter d-flex align-items-center">
                          <span className="px-2 py-1 border border-1 user-select-none" onClick={() => cartCounter(true, item)}>+</span>
                          <p className="mb-0 px-2">{item.quantity}</p>
                          <span className="px-2 py-1 border border-1 user-select-none" onClick={() => cartCounter(false, item)}>-</span>
                        </div>
                        <p className="text-secondary">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-top pt-3">
                <h5 className="d-flex justify-content-between">
                </h5>
                <Link to={'/checkout'} className="btn btn-primary w-100 mt-3"  >
                  Proceed to Checkout
                </Link>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

        </div>
      </div >
      <ToastContainer />

    </>
  );
}
