import {
  faHouse,
  faList,
  faPlus,
  faShop,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarLinks = [
  {
    name: "Home",
    link: "",
    icon: faHouse,
    role: ["admin", "1996"],
  },
  {
    name: "Admins",
    link: "Admins",
    icon: faUser,
    role: ["admin", "1996"],
  },
  {
    name: "Sellers",
    link: "Sellers",
    icon: faUser,
    role: ["admin", "1996"],
  },
  {
    name: "Customers",
    link: "Customers",
    icon: faUser,
    role: ["admin", "1996"],
  },
  {
    name: "Add User",
    link: "adduser",
    icon: faUserPlus,
    role: ["admin", "1996"],
  },
  {
    name: "Categories",
    link: "categories",
    icon: faList,
    role: ["admin", "1996"],
  },
  {
    name: "Add Categories",
    link: "addcategories",
    icon: faPlus,
    role: ["admin", "1996"],
  },
  {
    name: "Products",
    link: "products",
    icon: faShop,
    role: ["admin", "1996"],
  },
  {
    name: "Add Product",
    link: "addproduct",
    icon: faPlus,
    role: ["admin", "1996"],
  },
  {
    name: "Writetr",
    link: "writer",
    icon: faUser,
    role: ["1996"],
  },
];
