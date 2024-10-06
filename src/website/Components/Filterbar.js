import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactSlider from "react-slider";

export default function Filterbar() {
  const [showAvilbility, setShowAvilbility] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [checkedStock, setCheckedStock] = useState(false);
  const [checkedOutstock, setCheckedOutstock] = useState(false);
  const MIN = 100;
  const MAX = 12000;
  const [values, setValues] = useState([MIN, MAX]);

  return (
    <div className="filterbar ">
      <h1 className="text-black">Denim</h1>
      <div className="pb-3 border-bottom">
        <div
          className="d-flex justify-content-between align-items-center "
          onClick={() => setShowAvilbility(!showAvilbility)}
        >
          <p className="fs-4">Availability</p>
          {showAvilbility ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </div>
        <div style={{ display: showAvilbility ? "block" : "none" }}>
          <div className="customcheck position-relative my-3">
            <label htmlFor="stock" className="ps-4">
              In Stock
            </label>
            <input
              type="checkbox"
              id="stock"
              className="position-absolute"
              onChange={() => setCheckedStock(!checkedStock)}
              checked={checkedStock ? true : false}
            />
            <span
              className="checkmark"
              onClick={() => setCheckedStock(!checkedStock)}
            ></span>
          </div>
          <div className="customcheck position-relative">
            <label htmlFor="Outstock" className="ps-4">
              Out Of Stock
            </label>
            <input
              type="checkbox"
              id="Outstock"
              className="position-absolute"
              onChange={() => setCheckedOutstock(!checkedOutstock)}
              checked={checkedOutstock ? true : false}
            />
            <span
              className="checkmark"
              onClick={() => setCheckedOutstock(!checkedOutstock)}
            ></span>
          </div>
          <div></div>
        </div>
      </div>
      {/* ________ */}
      <div className="pb-3 mt-3">
        <div
          className="d-flex justify-content-between align-items-center "
          onClick={() => setShowPrice(!showPrice)}
        >
          <p className="fs-4">Price</p>
          {showPrice ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} />
          )}
        </div>
        <div style={{ display: showPrice ? "block" : "none" }}>
          <div className="price mt-4">
            <ReactSlider
              className="slider"
              value={values}
              min={MIN}
              max={MAX}
              onChange={(newValues) => setValues(newValues)}
            />
            <p className="text-black-50 mt-4">{`Price: LE ${values[0]} – LE ${values[1]}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
