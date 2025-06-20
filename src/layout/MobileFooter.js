import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import React,{useState, useEffect} from 'react';

function MobileFooter(props) {
  const [footertoggle, setFooterToggle] = useState(false);
  const [top, setTop] = useState(false); //초기값

  useEffect(()=>{
    const handleScroll=()=>{
      setTop(window.scrollY>200);
    };
    window.addEventListener('scroll',handleScroll);
  },[]);

  const scrollTop=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  };

  const handleToggle=()=>{
    setFooterToggle(prev => !prev);
  }

  return (
    <footer>
      <h2>
        <button onClick={handleToggle}>
          <img src={`${process.env.PUBLIC_URL}/images/mobile_logo.jpg`} alt='모바일로고'/>
          <FontAwesomeIcon icon={faAngleDown} style={{transform: footertoggle ? 'rotate(180deg) translateY(7px)' : 'rotate(0deg) translateY(-7px)'}} className='footer_down'/>
        </button>
      </h2>

      {top &&(
        <button className='top_btn' onClick={scrollTop}>
          <FontAwesomeIcon icon={faAngleUp} className='topbtn'/>
        </button>
      )}

      <address
      style={{
        maxHeight: footertoggle ? '300px' : '0', overflow:'hidden', transition:'0.3s'
      }}>
        <p>주) 레디고 대표 000  사업자번호 000-00-0000</p>
        <p>통신판매업 신고번호 000-서울서초-0000</p>
        <p>주소서울특별시 강남구 역삼동 000-00</p>
        <p>전화 0000-0000</p>
        <p>고객문의 00@gmail.com</p>
        <p>Copyright&copy; 2025 react project RE?GO! allright reserved.</p>
      </address>

      <ul>
        <li>이용약관</li>
        <li><strong>개인정보처리방침</strong></li>
        <li>운영정책</li>
        <li>위치기반서비스이용약관</li>
        <li>청소년보호정책</li>
      </ul>

      <div>
        <p><FontAwesomeIcon icon={faTwitter}/></p>
        <p><FontAwesomeIcon icon={faInstagram}/></p>
        <p><FontAwesomeIcon icon={faYoutube}/></p>
      </div>
    </footer>
  );
}

export default MobileFooter;