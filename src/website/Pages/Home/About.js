export default function About(props) {
  return (
    <>
      <div className="about container  gap-3 ">
        <div className="video-info ">
          <video
            src={require("../../videos/WhatsApp Video 2024-04-04 at 7.25.59 AM.mp4")}
            type="video/mp4"
            alt="Video"
            autoPlay
            loop
            muted
            className=""
          />
        </div>
        <div className="sale w-100 d-flex flex-column justify-content-center align-items-center ">
          <p>UP TO 30% OFF STREETWEAR.</p>
          <h2>RAMADAN DEALS</h2>
          <a href="/" className="btn ">
            <span>SHOP NOW</span>
          </a>
        </div>
      </div>
    </>
  );
}
