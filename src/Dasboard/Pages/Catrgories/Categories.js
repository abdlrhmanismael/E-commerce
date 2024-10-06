import Table from "../../Components/Table";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { useState } from "react";

export default function Categories() {
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(5);
  const { isSidebarOpen } = useSidebar();
  const tableHeader = [
    {
      name: "Title",
      token: "title",
    },
    {
      name: "Image",
      token: "image",
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
      className="categories flex-grow-1 "
      style={{
        width: !isSidebarOpen ? "80%" : "0",
      }}
    >
      <Table
        header={tableHeader}
        body="categories"
        del="category"
        page={page}
        limit={limit}
        setpage={setPage}
        search="title"
      />
    </div>
  );
}
