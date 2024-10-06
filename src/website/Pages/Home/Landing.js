import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Landing() {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  //loop of the vedio swiper
  const handleVideoEnded = () => {
    swiperRef.current.swiper.slideNext();
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.currentTime = 0;
      video.play();
    });
  };
  //video swiper start from 0 when slide change
  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        video.currentTime = 0;
        video.play();
      });
    }
  };

  return (
    <>
      <div>
        <Swiper
          modules={[Pagination]}
          ref={swiperRef}
          pagination={{ clickable: true, type: "progressbar" }}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onReachEnd={handleSlideChange}
        >
          <SwiperSlide>
            <div className="h-100">
              <a
                href="/"
                className="btn  position-absolute d-flex align-items-center  w-100 h-100 z-1 flex-column try"
              >
                <p className="text-white mb-0 swiperTitle ">
                  EXPLORING OUR TRENDY AND TIMELESS COLLECTION
                </p>
                <h1 className="text-white mt-0 swiperHeader">DENIM DREAM</h1>
                <button
                  href="/"
                  className="btn bg-white rounded-0 mt-4 swiperLink"
                >
                  BROWSE COLLECTION
                </button>
              </a>
              <video
                ref={(e) => (videoRefs.current[0] = e)}
                src={require("../../videos/Kvell Apparel Co. - Clothing Brand Promo Video.mp4")}
                type="video/mp4"
                alt="Logo"
                autoPlay
                muted
                className="h-100 w-100 object-fit-cover"
                onEnded={handleVideoEnded}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-100">
              <a
                href="/"
                className="btn  position-absolute d-flex align-items-center  w-100 h-100 z-1 flex-column try"
              >
                <p className="text-white swiperTitle ">
                  CHECK OUT OUR TRENDY HOODIES
                </p>
                <p className="text-white border-bottom swiperTitle">
                  HOODIES <FontAwesomeIcon icon={faArrowRightLong} />
                </p>
              </a>
              <video
                ref={(e) => (videoRefs.current[1] = e)}
                src={require("../../videos/Essentials Clothing Shoot - Promotional Video.mp4")}
                type="video/mp4"
                alt="Logo"
                autoPlay
                muted
                className="h-100 w-100 object-fit-cover"
                onEnded={handleVideoEnded}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
