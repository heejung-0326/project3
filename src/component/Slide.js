import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function Slide(props) {
  return (
    <section className='slide'>
      <Swiper
      modules={[Autoplay, Pagination,Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation
      autoplay={{delay:4500}}
      pagination={{clickable: true}}
      >
        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/main_slide1.png`} alt='메인슬라이드 이미지'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/main_slide2.png`} alt='메인슬라이드 이미지' />
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/main_slide3.png`} alt='메인슬라이드 이미지'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/main_slide4.png`} alt='메인슬라이드 이미지'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/main_slide5.png`} alt='메인슬라이드 이미지'/>
        </SwiperSlide>

      </Swiper>
    </section>
  );
}

export default Slide;