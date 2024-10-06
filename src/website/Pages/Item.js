import React, { useEffect, useRef, useState } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebsiteHeader from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "./Home/Footer";

// Import images

import { Axios } from "../../Dasboard/Axios/axios";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../../Dasboard/Components/Loading";
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
      let res = await Axios.get(`/product/${Id.item}`);
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
  console.log(erroritem);
  useEffect(() => {
    getitem();
  }, []);
  const showimgs =
    item === ""
      ? ""
      : item[0].images.map((img, key) => (
          <div className="p-1 item-img" key={key}>
            <img
              src={img.image}
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
  console.log(item);
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
                src={item === "" ? "" : item[0].images[activeIndex].image}
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
              <h3>{item[0].title}</h3>
              <p className="price mb-0">
                {item[0].price} <span className="tracking-wider">LE</span>
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
              <p className="des mt-4">{item[0].description}</p>
              <h6>
                Step into unrestricted comfort and conquer the season. Shop now
                and rewrite the summer rulebook.
              </h6>
              <h6 className="mt-3">COTTON 100%</h6>
              <button className="prim-btn border-0 w-100 letter-wide">
                ADD TO CART
              </button>
              <button className="prim-btn border-0 w-100 bg-black letter-wide mt-2">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
