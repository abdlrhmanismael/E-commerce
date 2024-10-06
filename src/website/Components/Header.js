import Marquee from "react-fast-marquee";

export default function WebsiteHeader() {
  return (
    <>
      <Marquee
        pauseOnHover={true}
        style={{ backgroundColor: "black", height: "50px" }}
      >
        <div className="me-5">
          <p className="m-0 text-white">
            FREE DELIVERY TO YOUR HOME FROM 1500 EGP
          </p>
        </div>
        <div className="me-5 text-white">
          <p className="m-0">FREE DELIVERY TO YOUR HOME FROM 1500 EGP</p>
        </div>
        <div className="me-5 text-white">
          <p className="m-0">FREE DELIVERY TO YOUR HOME FROM 1500 EGP</p>
        </div>
        <div className="me-5 text-white">
          <p className="m-0">FREE DELIVERY TO YOUR HOME FROM 1500 EGP</p>
        </div>
        <div className="me-5 text-white">
          <p className="m-0">FREE DELIVERY TO YOUR HOME FROM 1500 EGP</p>
        </div>
      </Marquee>
    </>
  );
}
