import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { useState } from "react";
import Loading from "../Components/Loading";
import { Axios } from "../Axios/axios";
export default function Register() {
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "0100",
  });

  const [icon, setIcon] = useState(false);

  const goodRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const strongRe =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!@#%^&*()-+=[\]{};':"|,.<>/?]).{8,}$/;
  const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [emaillerr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);

  //handle form
  function handleForm(e) {
    setform((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  async function submit(e) {
    e.preventDefault();

    try {

      const newForm = {
        userRegister: {
          ...form,
          address: {
            street: "zag",
            city: "string",
            state: "string",
            postalCode: 12345,
            country: "string",
          },
        },
        adminNotes: "string",
      };
      await Axios.post(`Admin/AdminRegister`, newForm);
      window.location.href = "/login"
    } catch (err) {
      console.log(err);
      setEmailErr(err.response.data)
    }
  }
  //password icon change
  function changeIcon(e) {
    setIcon(!icon);
  }
  console.log();
  return (
    <>
      {loading && <Loading />}
      <Header />
      <div className="center-page">
        <div className="form d-flex rounded-5 m-3">
          <div className="formDesign rounded-start-5 w-50 ">
          </div>

          <div className="formInfo mt-3 w-50 p-5 rounded-5">

            <h2 className="text-white mb-3">Create Your Account</h2>
            {emaillerr && (
              <p className="text-danger">{emaillerr}</p>
            )}
            <form onSubmit={submit}>
              <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control "
                  id="firstName"
                  placeholder="firstName"
                  required
                  value={form.firstName}
                  onChange={handleForm}
                />

                <label htmlFor="firstName" className=" position-absolute">
                  firs tName
                </label>
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control "
                  id="lastName"
                  placeholder="lastName"
                  required
                  value={form.lastName}
                  onChange={handleForm}
                />

                <label htmlFor="lastName" className=" position-absolute">
                  last Name
                </label>
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="text"
                  className="form-control "
                  id="username"
                  placeholder="username"
                  required
                  value={form.username}
                  onChange={handleForm}
                />

                <label htmlFor="username" className=" position-absolute">
                  last username
                </label>
              </div>
              <div className="mb-3 position-relative">
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleForm}
                  style={{
                    borderColor:
                      emailRe.test(form.email) !== true &&
                      form.email.length > 0 &&
                      "red",
                  }}
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
              <div className="d-flex gap-1">
                <div className="progress  mb-2" role="progressbar">
                  <div
                    className="progress-bar progressWeak"
                    style={{
                      width:
                        form.password.length === 0
                          ? "0%"
                          : goodRe.test(form.password) === false ||
                            strongRe.test(form.password === false)
                            ? "100%"
                            : goodRe.test(form.password)
                              ? "100%"
                              : strongRe.test(form.password) && "100%",
                    }}
                  />
                </div>
                <div className="progress  mb-2" role="progressbar">
                  <div
                    className="progress-bar progressGood"
                    style={{
                      width: form.password.match(goodRe)
                        ? "100%"
                        : form.password.match(strongRe) && "100%",
                    }}
                  />
                </div>
                <div className="progress  mb-2" role="progressbar">
                  <div
                    className="progress-bar progressStrong"
                    style={{ width: form.password.match(strongRe) && "100%" }}
                  />
                </div>
              </div>
              <p className="text-white text-end">
                {goodRe.test(form.password) && !strongRe.test(form.password)
                  ? "password is good"
                  : strongRe.test(form.password)
                    ? "password is strong"
                    : "password is weak"}
              </p>

              <p className="text-white mb-0">
                Password Must be more than 8 charchters and have at least one
                capital and one number
              </p>

              <button
                disabled={
                  emailRe.test(form.email) &&
                    (goodRe.test(form.password) ||
                      strongRe.test(form.password)) &&
                    form.password &&
                    form.firstName !== "" &&
                    form.lastName !== ""
                    ? false
                    : true
                }
                type="submit"
                className="btn btn-primary w-100  mt-4"
              >
                Create Account
              </button>
            </form>
            <p className="text-white mt-3 text-center">
              Already Have An Account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
