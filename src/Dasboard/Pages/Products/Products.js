import Table from "../../Components/Table";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { useState } from "react";

export default function Products() {
  const { isSidebarOpen } = useSidebar();
  const [page, setpage] = useState(1);
  const [limit, settlimit] = useState(5);
  const tableHeader = [
    {
      name: "Category",
      token: "category",
    },
    {
      name: "Title",
      token: "title",
    },
    {
      name: "Descripton",
      token: "description",
    },
    {
      name: "About",
      token: "About",
    },
    {
      name: "Price",
      token: "price",
    },
    {
      name: "Discount",
      token: "discount",
    },
    {
      name: "Images",
      token: "images",
    },
    {
      name: "Created At",
      token: "created_at",
    },
    {
      name: "Updated At",
      token: "updated_at",
    },
  ];

  return (
    <div
      className="categories flex-grow-1"
      style={{
        width: !isSidebarOpen ? "80%" : "0",
      }}
    >
      <Table
        header={tableHeader}
        body="products"
        del="product"
        page={page}
        limit={limit}
        setpage={setpage}
        search="title"
      />
    </div>
  );
}
