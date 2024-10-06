import NewSidebar from "../Components/NewSidebar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="dashboard d-flex">
      <NewSidebar />
      <Outlet />
    </div>
  );
}
