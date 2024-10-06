import About from "./About";
import FindUs from "./FindUs";
import Footer from "./Footer";
import Landing from "./Landing";
import NewItems from "./NewItems";
import TopCategories from "./TopCategories";

export default function HomeSite() {
  return (
    <>
      <Landing />
      <TopCategories />
      <About />
      <NewItems />
      <FindUs IsImgs={false} />
      <Footer />
    </>
  );
}
