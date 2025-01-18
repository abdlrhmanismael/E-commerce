import { useEffect, useState } from "react";
import WebsitePagination from "./WebsitePagination";
import { Axios } from "../../Dasboard/Axios/axios";

export default function ProductsWebsite() {
  const [items, setItems] = useState([]);
  async function getitems() {
    try {
      let res = await Axios.get(`/Product/GetAll`);
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getitems();
  }, []);
  const showItems = items.map((item, key) => (
    <div className="newitemcard col-12 col-md-6 col-lg-3  p-3" key={key}>
      <a href={`collection/${item.productID}`}>
        <div className="img w-100">
          <img
            src={item.productImages[0].imageUrl}
            alt="img"
            className="w-100 imgone"
          ></img>
          <img
            src={item.productImages[1].imageUrl}
            alt="img"
            className="w-100 position-absolute left-0 imgtwo"
          ></img>
        </div>
        <div className="iteminfo">
          <p className="sitename">e-commerce</p>
          <p className="title">{item.name}</p>
          <p className="price">{item.price}LE</p>
        </div>
      </a>
    </div>
  ));
  return (
    <>
      <div className=" flex-grow-1 ">
        <div className="d-flex flex-wrap">{showItems}</div>
      </div>
    </>
  );
}
