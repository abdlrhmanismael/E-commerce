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
    role: ["1995", "1996"],
  },
  {
    name: "Users",
    link: "Users",
    icon: faUser,
    role: ["1995", "1996"],
  },
  {
    name: "Add User",
    link: "adduser",
    icon: faUserPlus,
    role: ["1995", "1996"],
  },
  {
    name: "Categories",
    link: "categories",
    icon: faList,
    role: ["1995", "1996"],
  },
  {
    name: "Add Categories",
    link: "addcategories",
    icon: faPlus,
    role: ["1995", "1996"],
  },
  {
    name: "Products",
    link: "products",
    icon: faShop,
    role: ["1995", "1996"],
  },
  {
    name: "Add Product",
    link: "addproduct",
    icon: faPlus,
    role: ["1995", "1996"],
  },
  {
    name: "Writetr",
    link: "writer",
    icon: faUser,
    role: ["1996"],
  },
];
