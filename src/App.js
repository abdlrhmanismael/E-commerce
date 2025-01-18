import { Route, Routes } from "react-router-dom";
import Register from "./Dasboard/Authrizations/Register";
import Login from "./Dasboard/Authrizations/Login";
import Home from "./Dasboard/Pages/Home";
import "../src/scss/dashboard/style.css";
import Users from "./Dasboard/Pages/Users/Users";
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
import LibraryTable from "./Dasboard/Components/LibraryTable";
import Sellers from "./Dasboard/Pages/Users/Sellers";
import EditSeller from "./Dasboard/Pages/Users/EditSeller";
import Customers from "./Dasboard/Pages/Users/Customers";
import EditCustomer from "./Dasboard/Pages/Users/EditCustomer";
import LoginAuth from "./website/Auth/LoginAuth";
import ReAuth from "./website/Auth/ReAuth";
import Account from "./website/Pages/Home/Account";
import Checkout from "./website/Pages/Checkout";
import OrderSuccess from "./website/Pages/OrderSuccess";
import OrderDetails from "./website/Pages/OrderDetails";
import Orders from "./Dasboard/Pages/Orders/Orders";
import StoreOrderDetails from "./Dasboard/Pages/Orders/StoreOrderDetails";
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
          <Route element={<LoginAuth />}>
            <Route path="account/login" element={<AccountLogin />} />
          </Route>
          <Route element={<ReAuth />}>
            <Route path="account/signup" element={<AccountSignup />} />
          </Route>
          <Route path="contactus" element={<ContactUs />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success/:id" element={<OrderSuccess />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route
            path="findus"
            element={<FindUs IsImgs={true} content={ImgFindUS} />}
          />
        </Route>
        <Route path="/collection/:item" element={<Item />} />
        {/* dashboard */}
        <Route element={<AuthLoRe />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/403" element={<Err403 />} />
        <Route path="/" element={<Home />}>
          <Route path="admins" element={<Users />} />
          <Route path="admins/:id" element={<EditUser />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="sellers/:id" element={<EditSeller />} />
          <Route path="Customers" element={<Customers />} />
          <Route path="customers/:id" element={<EditCustomer />} />
          <Route path="categories" element={<Categories />} />
          <Route path="addcategories" element={<AddCategories />} />
          <Route path="categories/:id" element={<EditCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="products/:id" element={<EditProduct />} />
          <Route path="table" element={<LibraryTable />} />
          <Route path="orders" element={<Orders />} />
          <Route path="store/order/:id" element={<StoreOrderDetails />} />

        </Route>

      </Routes>
    </>
  );
}
