import ReactPaginate from "react-paginate";

export default function WebsitePagination(props) {
  const pages = Math.ceil(props.total / props.itemPerPage);
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pages}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        className="pagiweb"
        pageClassName="pagili"
        nextClassName="next"
        disabledClassName=""
        onPageChange={(e) => props.setpage(e.selected + 1)}
      />
    </>
  );
}
