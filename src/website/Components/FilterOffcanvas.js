import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
export default function FilterOffcanvas({ name, ...props }) {
  const [showFilter, setShowFilter] = useState(false);
  const handleClose = () => setShowFilter(false);
  const handleShow = () => setShowFilter(true);
  const [showavl, setShowAvl] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [checkedStock, setCheckedStock] = useState(false);
  const [checkedOutstock, setCheckedOutstock] = useState(false);
  return (
    <>
      <div className="container px-3">
        <button className="prim-btn w-100 border-0 filter" onClick={handleShow}>
          Filter And Sort
        </button>
      </div>
      <Offcanvas
        show={showFilter}
        onHide={handleClose}
        placement="end"
        className="off"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>Filter And Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div
              className="d-flex justify-content-between align-items-center border-bottom mb-3"
              onClick={() => setShowAvl(true)}
            >
              <button className="btn fs-3">Avilability</button>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <div
              className="d-flex justify-content-between align-items-center border-bottom mb-3"
              onClick={() => setShowPrice(true)}
            >
              <button className="btn fs-3">Price</button>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showavl}
        onHide={() => {
          setShowPrice(false);
          setShowFilter(false);
          setShowAvl(false);
        }}
        placement="end"
        className="off"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter And Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className="d-flex align-items-center mb-3"
            onClick={() => setShowAvl(false)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
            <p className="m-0 ms-3 fs-5">Avilability</p>
          </div>
          <div>
            <div className="customcheck position-relative my-3  ">
              <label
                htmlFor="stock"
                className="ps-4"
                onClick={() => setCheckedStock(!checkedStock)}
              >
                In Stock
              </label>
              <input
                type="checkbox"
                id="stock"
                className="position-absolute"
                onChange={() => setCheckedStock(!checkedOutstock)}
                checked={checkedStock ? true : false}
              />
              <span
                className="checkmark"
                onClick={() => setCheckedStock(!checkedStock)}
              ></span>
            </div>
            <div className="customcheck position-relative border-top py-4">
              <label
                htmlFor="Outstock"
                className="ps-4"
                onClick={() => setCheckedOutstock(!checkedOutstock)}
              >
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
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showPrice}
        onHide={() => {
          setShowPrice(false);
          setShowFilter(false);
          setShowAvl(false);
        }}
        placement="end"
        className="off"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>Filter And Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className="d-flex align-items-center mb-3"
            onClick={() => setShowPrice(false)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
            <p className="m-0 ms-3 fs-5">Price</p>
          </div>
          <div className="d-felx border-bottom pb-3">
            <label htmlFor="from" className="w-50" id="le">
              From
            </label>
            <input
              type="number"
              className="w-50 border-0 outline-none outline-none"
              placeholder="0"
              id="from"
            />
          </div>
          <div className="d-felx pb-3 mt-3">
            <label htmlFor="to" className="w-50" id="le">
              To
            </label>
            <input
              type="number"
              className="w-50 border-0 outline-none outline-none"
              placeholder="0"
              id="to"
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
