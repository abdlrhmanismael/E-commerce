import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Pages/Home/Footer";
export default function Website() {
  return (
    <>
      <Navbar position="relative" site="true" />
      <Outlet />
      <Footer />
    </>
  );
}
