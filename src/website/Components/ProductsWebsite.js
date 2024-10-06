import { useEffect, useState } from "react";
import WebsitePagination from "./WebsitePagination";
import { Axios } from "../../Dasboard/Axios/axios";

export default function ProductsWebsite() {
  const [page, setpage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState([]);
  async function getitems() {
    try {
      let res = await Axios.get(`/products?limit=${4}&page=${page}`);
      setItems(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getitems();
  }, [page]);
  console.log(page);
  const showItems = items.map((item, key) => (
    <div className="newitemcard col-12 col-md-6 col-lg-3  p-3" key={key}>
      <a href={`collection/${item.id}`}>
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
          <p className="price">{item.price}LE</p>
        </div>
      </a>
    </div>
  ));
  return (
    <>
      <div className=" flex-grow-1 ">
        <div className="d-flex flex-wrap">{showItems}</div>
        <WebsitePagination total={total} itemPerPage={4} setpage={setpage} />
      </div>
    </>
  );
}
