import Table from "../../Components/Table";
import { useSidebar } from "../../Context/SidebarIsOpen";
import { useState } from "react";

export default function Users() {
  const { isSidebarOpen } = useSidebar();
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(3);
  let friends = [
    "Ahmed",
    "Sayed",
    "Eman",
    "Mahmoud",
    "Ameer",
    "Osama",
    "Sameh",
  ];
  let letter = "a";
  console.log(letter.endsWith());
  const tableHeader = [
    {
      name: "Id",
      token: "id",
    },
    {
      name: "Name",
      token: "name",
    },
    {
      name: "Email",
      token: "email",
    },

    {
      name: "Role",
      token: "role",
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
      className="usersPage flex-grow-1"
      style={{
        width: !isSidebarOpen ? "80%" : "0",
      }}
    >
      <Table
        header={tableHeader}
        body="users"
        del="user"
        page={page}
        limit={limit}
        setpage={setpage}
        search="name"
      />
    </div>
  );
}
