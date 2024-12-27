import { useEffect, useState } from "react";
import { Axios } from "../../../Dasboard/Axios/axios";

export default function TopCategories() {
  const [cat, setCat] = useState([]);
  async function getcat() {
    try {
      let res = await Axios.get("/RefProductType/GetAll");
      setCat(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getcat();
  }, []);
  const showcat = cat.map((cat, key) => (
    <div
      className={`${key === 2
        ? "categorycard col-12 col-lg-4  mt-3"
        : "categorycard  col-6 col-lg-4 mt-3"
        }`}
      key={key}
    >
      <a href="/" className=" position-relative ">
        <div className="w-100 h-100 imgeffect">
          <img src={require('../../images/model.jpg')} alt="img" className="w-100 h-100" />
          <p className="position-absolute bottom-0 text-white catpara">
            {cat.productTypeName}
          </p>
        </div>
      </a>
    </div>
  ));
  return (
    <div className="mt-5">
      <h1 className="container ps-4 my-0 text-black">Categories</h1>
      <div className="topcategories container p-4 mt-0  ">
        <div className="row">{showcat}</div>
      </div>
    </div>
  );
}
