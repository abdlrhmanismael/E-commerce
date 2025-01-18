import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
export default function Login() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [icon, setIcon] = useState(false);
  const cookie = Cookie();
  const [emaillerr, setEmailErr] = useState("");
  //handel Form
  function handleForm(e) {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  //submit register request
  async function submit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://thisisanecommerce.runasp.net/api/Login/Login",
        form
      );
      const role = res.data.roles[0];
      if (role === "admin") {
        cookie.set("Bearer", res.data.token);
        window.location.pathname = "/";
      } else {
        setEmailErr(401);
        console.log("err");
      }
    } catch (err) {
      setEmailErr(err.response.status);
      console.log(emaillerr);
    }
  }
  //password icon change
  function changeIcon() {
    setIcon(!icon);
  }

  return (
    <>
      <Header />
      <div className="center-page">
        <div className="form d-flex rounded-5 m-3">
          <div className="formDesign rounded-start-5 w-50 "></div>
          <div className="formInfo mt-3 w-50 p-5 rounded-5">
            <h2 className="text-white mb-3">Create Your Account</h2>
            {emaillerr === 400 && (
              <p className="text-danger">email or password is incorrect</p>
            )}
            <form onSubmit={submit}>
              <div className="mb-3 position-relative ">
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleForm}
                />
                <label htmlFor="email" className=" position-absolute">
                  Email
                </label>
              </div>
              <div className="mb-2 position-relative">
                <input
                  type={!icon ? "password" : "text"}
                  className="form-control "
                  id="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={handleForm}
                />
                <label htmlFor="password" className=" position-absolute">
                  Password
                </label>
                <span className="iconLock" onClick={changeIcon}>
                  {icon ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
              </div>

              <button type="submit" className="btn btn-primary w-100  mt-4">
                Login
              </button>
            </form>
            <p className="text-white mt-3 text-center">
              Dosn't Have Account? <Link to="/Register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
