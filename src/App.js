import { Route, Routes } from "react-router-dom";
import Register from "./Dasboard/Authrizations/Register";
import Login from "./Dasboard/Authrizations/Login";
import Home from "./Dasboard/Pages/Home";
import "../src/assets/dashboard/css/style.css";
import Users from "./Dasboard/Pages/Users/Users";
import RequireAuth from "./Dasboard/Authrizations/RequireAuth";
import RequireRole from "./Dasboard/Authrizations/RquireRole";
import Err403 from "./Dasboard/Components/Err403";
import Err404 from "./Dasboard/Components/Err404";
import AuthLoRe from "./Dasboard/Authrizations/AuthLoRe";
import EditUser from "./Dasboard/Pages/Users/EditUser";
import AddUser from "./Dasboard/Pages/Users/AddUser";
import Categories from "./Dasboard/Pages/Catrgories/Categories";
import AddCategories from "./Dasboard/Pages/Catrgories/AddCategories";
import EditCategory from "./Dasboard/Pages/Catrgories/EditCategory";
import AddProduct from "./Dasboard/Pages/Products/AddProduct";
import Products from "./Dasboard/Pages/Products/Products";
import EditProduct from "./Dasboard/Pages/Products/EditProdcut";
import WebsiteShow from "./website/Pages/WebsiteShow";
import HomeSite from "./website/Pages/Home/Home";
import SiteProducts from "./website/Components/SiteProducts";
import Website from "./website/Website";
import Item from "./website/Pages/Item";
import AccountLogin from "./website/Pages/AccountLogin";
import AccountSignup from "./website/Pages/AccountSignup";
import FindUs from "./website/Pages/Home/FindUs";
import ImgFindUS from "../src/website/images/modelitem.png";
import ContactUs from "./website/Pages/ContactUs";
import Test from "./Test";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Err404 />} />
        {/* website */}
        <Route element={<WebsiteShow />}>
          <Route path="home" element={<HomeSite />} />
        </Route>
        <Route element={<Website />}>
          <Route path="siteproducts" element={<SiteProducts />} />
          <Route path="account/login" element={<AccountLogin />} />
          <Route path="account/signup" element={<AccountSignup />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route
            path="findus"
            element={<FindUs IsImgs={true} content={ImgFindUS} />}
          />
        </Route>
        <Route path="/collection/:item" element={<Item />} />
        <Route path="/test" element={<Test />} />
        {/* dashboard */}
        <Route element={<AuthLoRe />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/403" element={<Err403 />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}>
            <Route element={<RequireRole allowRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<EditUser />} />
              <Route path="adduser" element={<AddUser />} />
              <Route path="categories" element={<Categories />} />
              <Route path="addcategories" element={<AddCategories />} />
              <Route path="categories/:id" element={<EditCategory />} />
              <Route path="products" element={<Products />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="products/:id" element={<EditProduct />} />
            </Route>
          </Route>
        </Route>
        {/* dashboard */}
      </Routes>
    </>
  );
}
