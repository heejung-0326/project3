import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
function MobileTag(props) {
    const [color, setColor] = useState(-1);
    const tags =[
      {tag:'#핫한 티셔츠', link:'/clothing'},
      {tag:'#신상'},
      {tag:'#요즘 인기'},
      {tag:'#팔찌'},
      {tag:'#햇빛 피하기'},
      {tag:'#햇빛 가리기'},
      {tag:'#장마철'},
      {tag:'#가방꾸미기'},
      {tag:'#비오는 날'},
      {tag:'#요즘 뷰티?'},
      {tag:'#인기브랜드'},
      {tag:'#한정판'},
      {tag:'#순삭매물'},
      {tag:'#향수'},
      {tag:'#머그컵'},
      {tag:'#운동복'}
    ];
  return (
    <section className='main_tag'>
    <ul>
    <Swiper
    modules={[Autoplay]}
    spaceBetween={0}
    slidesPerView={3}
    loop={true}
    freeMode={true}
    autoplay={{delay:0}}
    speed={2000}
    allowTouchMove={false}
    >
      {tags.map((item, idx)=>(
        <SwiperSlide
        key={idx}>
        <li 
        className={color === idx ? 'colorchange' : ''}
        onClick={()=>setColor(idx)}
        >
          <Link to={item.link || '#'}>{item.tag}</Link>
        </li>
        
        </SwiperSlide>
      ))}
    </Swiper>
    </ul>
    </section>
  );
}

export default MobileTag;