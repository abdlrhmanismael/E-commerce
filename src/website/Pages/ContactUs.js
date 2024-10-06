import { Link } from "react-router-dom";
import FindUs from "./Home/FindUs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function ContactUs() {
  return (
    <div className="contact">
      <div className="contact-img position-relative">
        <h1 className="position-absolute">Contact Us</h1>
        <img
          className="img-fluid w-100"
          src={require("../images/section.png")}
          alt=""
        />
      </div>
      <div className="container p-5">
        <div className="row  ">
          <div className="col-12 col-md-8">
            <h4 className="text-black mb-4">Get In Touch</h4>
            <form>
              <input type="text" className="web-input" placeholder="Name" />
              <input type="email" className="web-input" placeholder="Email" />
              <input
                type="text"
                className="web-input"
                placeholder="Phone number"
              />
              <textarea className="web-input" placeholder="comment"></textarea>
              <button className="btn-prim bg-black border-0 text-white letter-wide p-3">
                Send Message
              </button>
            </form>
          </div>
          <div className="col-12 col-md-4 con-info">
            <div className="mb-3">
              <h4 className="text-black">Customer service</h4>
              <p>0123456789 - 01234567889 </p>
            </div>
            <div className="my-3">
              <h4 className="text-black">Online</h4>
              <p>0123456789 </p>
            </div>
            <div className="my-3">
              <h4 className="text-black">Email</h4>
              <p>Abdulrahmanismael992@gmail.com </p>
            </div>
            <div className="my-3">
              <h4 className="text-black">Our Stores</h4>
              <Link to="/findus" className="catinfo">
                STORES
              </Link>
            </div>
            <div className="my-3">
              <h4 className="text-black">Our Stores</h4>
              <Link to="/home" className="me-3">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link to="/home">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FindUs Isimgs={false} />
    </div>
  );
}
