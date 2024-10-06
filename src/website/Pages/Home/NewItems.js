import { useEffect, useState } from "react";
import { Axios } from "../../../Dasboard/Axios/axios";
import { Link } from "react-router-dom";

export default function NewItems() {
  const [items, setItems] = useState([]);
  async function getitems() {
    try {
      let res = await Axios.get("/products?limit=8");
      setItems(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getitems();
  }, []);
  const showItems =
    items.length > 0 &&
    items.map((item, key) => (
      <div className="newitemcard col-8 col-md-4 col-lg-3  p-3" key={key}>
        <Link to={`/collection/${item.id}`}>
          <div className="img w-100">
            <img
              src={item.images[0].image}
              alt="img"
              className="w-100 imgone"
            ></img>
            <img
              src={item.images[1].image}
              alt="img"
              className="w-100 position-absolute left-0 imgtwo"
            ></img>
          </div>
          <div className="iteminfo">
            <p className="sitename">e-commerce</p>
            <p className="title">{item.title}</p>
            <p className="price">{item.price} LE</p>
          </div>
        </Link>
      </div>
    ));
  return (
    <div className="mt-5">
      <h3 className="container ps-4 my-0">
        New items that you can’t miss out on
      </h3>
      <div className="newitems container  d-flex mt-2">{showItems}</div>
      <div className="d-flex justify-content-center mb-3">
        <a href="/siteproducts" className="prim-btn">
          <span>VIEW ALL</span>
        </a>
      </div>
    </div>
  );
}
