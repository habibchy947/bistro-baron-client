import { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const PopularItems = () => {
    const [popular, setPopular] = useState([])
    useEffect(() => {
        axios.get('menu.json')
            .then(res => {
                const menu = res.data.filter(product => product.category === 'popular')
                setPopular(menu)
            })
    }, [])
    console.log(popular)
    return (
        <div className="py-14">
            <Header
                subHeading={'From 11:00am to 10:00pm'}
                heading={'order online'}>
            </Header>
            <div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        popular.map(popu => <SwiperSlide key={popu._id}><img src={popu.image} alt="" /></SwiperSlide>)
                    }
                    
                </Swiper>
            </div>
        </div>
    );
};

export default PopularItems;