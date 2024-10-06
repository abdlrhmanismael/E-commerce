import FilterOffcanvas from "./FilterOffcanvas";
import Filterbar from "./Filterbar";
import ProductsWebsite from "./ProductsWebsite";

export default function SiteProducts() {
  return (
    <>
      <FilterOffcanvas />
      <div className="container d-flex">
        <Filterbar />
        <ProductsWebsite />
      </div>
    </>
  );
}
