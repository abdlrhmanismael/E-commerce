import Navbar from "../Components/Navbar";
import NewSidebar from "../Components/NewSidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="dashboard d-block d-sm-flex ">
      <NewSidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
