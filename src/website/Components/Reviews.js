import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Reviews(props) {
    const reviews = [
        {
            name: "John Doe",
            review: "Amazing product! Highly recommend to everyone.",
            rating: 5,
        },
        {
            name: "Jane Smith",
            review: "Great value for the price. Quality is top-notch!",
            rating: 4,
        },
        {
            name: "Michael Brown",
            review: "Good overall experience, but shipping was slow.",
            rating: 3,
        },
    ];

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Customer Reviews</h2>
            <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                spaceBetween={20}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="swiper-container"
            >
                {props.reviews.map((review, index) => (
                    <SwiperSlide key={index} style={{ height: "300px" }}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{review.customerID}</h5>
                                <p className="card-text">{review.body}</p>
                                <div className="text-warning">
                                    {"★".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};

