import React,{useState, useEffect} from 'react';
import '../css/main.scss';
import Slide from './Slide';
import Nav from './Nav';
import Tag from './Tag';
import MobileTag from './MobileTag';
import MobileSlide from './MobileSlide';
import Event from './Event';

function Main(props) {
  // 모바일 해상도일 때
  const [Mobile, setMobile] = useState(window.innerWidth <= 767);
  useEffect(()=>{
    const handleResize =()=>{
      setMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);
    return ()=> window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main>
      {Mobile ? <MobileSlide/> : <Slide />}
      <Nav />
      {Mobile ? <MobileTag /> : <Tag/> }
      <Event />
    </main>
  );
}

export default Main;