import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import Login from "./Login";
import { Navigate, Outlet } from "react-router-dom";
import { Axios } from "../Axios/axios";

export default function RequireAuth() {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);
  // IF THERE  USER?
  async function GetUser() {
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
    GetUser();
  }, []);

  return token === "" ? (
    <Login />
  ) : loading ? null : isUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
