import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Header from '../../../Components/Header';
import slide1 from '../../../assets/assets/home/slide1.jpg'
import slide2 from '../../../assets/assets/home/slide2.jpg'
import slide3 from '../../../assets/assets/home/slide3.jpg'
import slide4 from '../../../assets/assets/home/slide4.jpg'
import slide5 from '../../../assets/assets/home/slide5.jpg'
const Category = () => {
    return (
        <div className='w-11/12  mx-auto'>
            <Header
                subHeading={'From 11:00am to 10:00pm'}
                heading={'order online'}>
            </Header>
            <div className='my-14'>
            <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper relative pb-20"
      >
        <SwiperSlide>
            <img src={slide1}  alt="" />
            <h2 className='text-3xl text-center -mt-20 text-[#FFFFFF] uppercase'>Salads</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide2} alt="" />
            <h2 className='text-3xl text-center -mt-20 text-[#FFFFFF] uppercase'>Pizza</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide3} alt="" />
            <h2 className='text-3xl text-center -mt-20 text-[#FFFFFF] uppercase'>Soup</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide4} alt="" />
            <h2 className='text-3xl text-center -mt-20 text-[#FFFFFF] uppercase'>Dessert</h2>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide5} alt="" />
            <h2 className='text-3xl text-center -mt-20 text-[#FFFFFF] uppercase'>Salads</h2>
        </SwiperSlide>
      </Swiper>
            </div>
        </div>
    );
};

export default Category;