import Header from "../../../Components/Header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        axios.get('reviews.json')
            .then(res => {
                setReviews(res.data)
            })
    }, [])
    console.log(reviews)
    return (
        <div className="w-11/12 md:w-10/12 mx-auto py-28">
            <Header subHeading={'What Our Client Say'} heading={'Testimonials'} />
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="px-20 space-y-3 flex flex-col items-center justify-center text-center py-6">
                                <p className="text-center text-6xl"><FaQuoteLeft /></p>
                                <p>
                                    {review.details}
                                </p>
                                <h3 className="text-2xl text-[#D99904]">{review.name}</h3>
                            </div>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;