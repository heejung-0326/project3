import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function MobileSlide(props) {
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
          <img src={`${process.env.PUBLIC_URL}/images/main/mobile_slide1.jpg`} alt='메인슬라이드 이미지1'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/mobile_slide2.jpg`} alt='메인슬라이드 이미지2'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/mobile_slide3.jpg`} alt='메인슬라이드 이미지3'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/mobile_slide4.jpg`} alt='메인슬라이드 이미지4'/>
        </SwiperSlide>

        <SwiperSlide>
          <img src={`${process.env.PUBLIC_URL}/images/main/mobile_slide5.jpg`} alt='메인슬라이드 이미지5'/>
        </SwiperSlide>

      </Swiper>
    </section>
  );
}

export default MobileSlide;