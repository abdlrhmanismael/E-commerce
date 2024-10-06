import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";
import Loading from "../Components/Loading";
import { Axios } from "../Axios/axios";
export default function AuthLoRe() {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const [isuser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  async function check() {
    try {
      await Axios.get("user");
      setIsUser(true);
    } catch (err) {
      setIsUser(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    check();
  }, []);
  return token === "" ? (
    <Outlet />
  ) : loading ? (
    <Loading />
  ) : isuser ? (
    (window.location.pathname = "")
  ) : (
    <Outlet />
  );
}
