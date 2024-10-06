import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Components/Loading";
import { Axios } from "../Axios/axios";
export default function RequireRole({ allowRole = [] }) {
  const [role, setRole] = useState(false);
  const [loading, setLoading] = useState(true);
  //get user role
  async function check() {
    try {
      let res = await Axios.get("user");
      setLoading(false);

      setRole(res.data.role);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    check();
  }, []);

  return loading ? (
    <Loading />
  ) : allowRole.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/403" />
  );
}
