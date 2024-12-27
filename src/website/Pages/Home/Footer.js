import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useWindowWidth } from "../../../Dasboard/Context/GetWidth";
import { Axios } from "../../../Dasboard/Axios/axios";

export default function Footer() {
  const widtwindow = useWindowWidth();
  const [categories, setCategoriet] = useState([]);
  useEffect(() => {
    Axios
      .get("/RefProductType/GetAll")
      .then((data) => setCategoriet(data.data));
  }, []);
  const showCategories = categories.map((category, key) => (
    <li className="text-black" key={key}>
      {category.title}
    </li>
  ));
  return widtwindow > 750 ? (
    <div className="footer container mt-5 d-flex">
      <div className="footer-info d-flex col-9 ">
        <div className="intrested">
          <p>YOU MIGHT BE INTERESTED IN</p>
          <ul>{showCategories}</ul>
        </div>
        <div className="company">
          <p>COMPANY</p>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Our Stores</li>
          </ul>
        </div>
        <div className="help">
          <p>Get Help</p>
          <ul>
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>Sizing Chart</li>
            <li>Care Guide</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="exclusive col-3 d-flex">
        <p>EXCLUSIVE BENEFITS</p>

        <input
          type="email"
          id="exclusiveemail"
          placeholder="Enter Email Here"
        />
        <p className="mt-3 ">
          Apply for our free membership to receive exclusive deals, news, and
          events.
        </p>
        <div className="social">
          <a href="/">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div className="footer">
      <div className="accordion " id="accordioninter">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#intrested"
              aria-expanded="false"
              aria-controls="intrested"
            >
              YOU MIGHT BE INTERESTED IN
            </button>
          </h2>
          <div
            id="intrested"
            className="accordion-collapse collapse"
            data-bs-parent="#accordioninter"
          >
            <ul className="accordion-body">{showCategories}</ul>
          </div>
        </div>
      </div>

      <div className="accordion" id="accordioncompany">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#company"
              aria-expanded="false"
              aria-controls="company"
            >
              COMPANY
            </button>
          </h2>
          <div
            id="company"
            className="accordion-collapse collapse"
            data-bs-parent="#accordioncompany"
          >
            <ul className="accordion-body">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Our Stores</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion" id="accordionhelp">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#help"
              aria-expanded="false"
              aria-controls="help"
            >
              GET HELP
            </button>
          </h2>
          <div
            id="help"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionhelp"
          >
            <ul className="accordion-body">
              <li>Contact Us</li>
              <li>Shipping & Returns</li>
              <li>Sizing Chart</li>
              <li>Care Guide</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion" id="accordionbenfits">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#benfits"
              aria-expanded="false"
              aria-controls="benfits"
            >
              EXCLUSIVE BENEFITS
            </button>
          </h2>
          <div
            id="benfits"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionbenfits"
          >
            <div className="accordion-body">
              <input
                type="email"
                id="exclusiveemail"
                placeholder="Enter Email Here"
              />
              <p className="mt-3 ">
                Apply for our free membership to receive exclusive deals, news,
                and events.
              </p>
              <div className="social">
                <a href="/">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
