import React, { useContext, useEffect, useRef, useState } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebsiteHeader from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "./Home/Footer";
import { CartContext } from "../../Dasboard/Context/Cart";
import { Axios } from "../../Dasboard/Axios/axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Dasboard/Components/Loading";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reviews from "../Components/Reviews";

export default function Item() {
  const Id = useParams();
  const [item, setItem] = useState("");
  const [erroritem, setERR] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const collectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleScroll = (direction) => {
    const collection = collectionRef.current;
    const scrollAmount = direction === "left" ? -100 : 100;
    collection.scrollTo({
      left: collection.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };
  const cookie = Cookie();
  const token = cookie.get("CustomerAccount");
  const id = cookie.get("CustomerId");
  const { cartitems, setCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    const selectedSize = document.getElementById("size").value;
    const cartItem = {
      customerID: id,
      productID: item.productID,
      quantity: 1, // Default quantity
    };
    if (token) {
      try {
        await Axios.post('/Cart/AddorupdateCart', cartItem)
        let cart = await Axios.get(`/cart/GetCartByCustomerID?customerID=${id}`)
        setCart(cart.data.cartItems)
        toast.success("added", {
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.href = '/account/login'
    }
  };

  const checkScrollPosition = () => {
    const collection = collectionRef.current;
    setIsAtStart(collection.scrollLeft === 0);
    setIsAtEnd(
      collection.scrollLeft + collection.clientWidth >= collection.scrollWidth
    );
  };

  useEffect(() => {
    if (!loading && !erroritem) {
      const collection = collectionRef.current;
      collection.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => {
        collection.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, []);
  async function getitem() {
    try {
      let res = await Axios.get(`/Product/GetByID?ID=${Id.item}`);
      if (res.data.length === 0) {
        setERR(true);
      } else {
        setItem(res.data);
      }
    } catch (error) {
      setERR(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getitem();
  }, []);

  const showimgs =
    item === ""
      ? ""
      : item.productImages.map((img, key) => (
        <div className="p-1 item-img" key={key}>
          <img
            src={img.imageUrl}
            alt="img"
            className="border-black"
            width="70px"
            height="100%"
            onClick={(e) => {
              document.querySelector(".active")?.classList.remove("active");
              e.target.classList.add("active");
              setActiveIndex(key);
            }}
          />
        </div>
      ));
  return loading ? (
    <Loading />
  ) : erroritem ? (
    <Navigate to="/404" />
  ) : (
    <>
      <Navbar position="relative" site="true" />
      <WebsiteHeader />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div>
              <img
                src={item === "" ? "" : item.productImages[activeIndex].imageUrl}
                alt=""
                width="100%"
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <div>
                <FontAwesomeIcon
                  className={`me-3 ${isAtStart && "disactive"}`}
                  icon={faAngleLeft}
                  onClick={() => !isAtStart && handleScroll("left")}
                />
              </div>
              <div className="d-flex overflow-auto">
                <div className="itemslider d-flex shadow" ref={collectionRef}>
                  {showimgs}
                </div>
              </div>
              <div>
                <FontAwesomeIcon
                  className={`ms-3 ${isAtEnd ? "disactive" : ""}`}
                  icon={faAngleRight}
                  onClick={() => !isAtEnd && handleScroll("right")}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="item-des p-4">
              <h3>{item.name}</h3>
              <p className="price mb-0">
                {item.price} <span className="tracking-wider">LE</span>
              </p>
              <p className="tax">
                Tax included. Shipping calculated at checkout.
              </p>
              <div className="sel">
                <label htmlFor="size" className="d-block">
                  Size
                </label>
                <select id="size" className="w-100 mt-2">
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                  <option>32</option>
                  <option>33</option>
                </select>
              </div>
              <p className="des mt-4">{item.description}</p>
              <h6>
                Step into unrestricted comfort and conquer the season. Shop now
                and rewrite the summer rulebook.
              </h6>
              <h6 className="mt-3">COTTON 100%</h6>
              <button className="prim-btn border-0 w-100 letter-wide" onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
      <Footer />
      <ToastContainer />
    </>
  );
}
