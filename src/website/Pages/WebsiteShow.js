import WebsiteHeader from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
export default function WebsiteShow() {
  return (
    <>
      <WebsiteHeader />
      <Navbar position="absolute" />
      <Outlet />
    </>
  );
}
