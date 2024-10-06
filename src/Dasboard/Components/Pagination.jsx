import ReactPaginate from "react-paginate";

export default function Pagination({
  itemsPerPage,
  setpage,
  total,
  loadingTable,
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const pageCount = Math.ceil(total / itemsPerPage);
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setpage(e.selected + 1)}
        pageRangeDisplayed={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={"d-flex justify-content-center"}
        nextLinkClassName={"text-decoration-none m-3"}
        previousLinkClassName={"text-decoration-none m-3"}
        pageClassName={"mx-1 my-1"}
        marginPagesDisplayed={1}
        pageLinkClassName={"pag-anchore"}
        activeLinkClassName={"bg-primary active-pag"}
      />
    </>
  );
}
