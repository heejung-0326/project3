import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Footer(props) {
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
  return (
    <footer>
      <div className='f_inner'>
        <h2>
          <Link to='/' title='메인바로가기'>
            <img src={`${process.env.PUBLIC_URL}/images/pc_logo.jpg`} alt="하단로고 이미지"/>
          </Link> 
        </h2>
        
        {top &&(
        <button className='top_btn' onClick={scrollTop}>
          <FontAwesomeIcon icon={faArrowUp} className='topbtn'/>
        </button>
        )}

        <ul>
          <li>이용약관</li>
          <li><strong>개인정보처리방침</strong></li>
          <li>운영정책</li>
          <li>위치기반서비스 이용약관</li>
          <li>청소녀보호정책</li>
        </ul>

        <div className='f_sns'>
          <FontAwesomeIcon icon={faTwitter} className='f_sns_icon'/>
          <FontAwesomeIcon icon={faInstagram}
          className='f_sns_icon'/>
          <FontAwesomeIcon icon={faYoutube}
          className='f_sns_icon'/>
        </div>

        <div className='f_info'>
          <p>주) 레디고 대표 000  사업자번호 000-00-0000통신판매업 신고번호 000-서울서초-0000</p>
          <p>주소서울특별시 강남구 역삼동 000-00 전화 0000-0000 고객문의 00@gmail.com</p>
        </div>

        <address>Copyright&copy; 2025 react project RE?GO! allright reserved.</address>
      </div>
    </footer>
  );
}

export default Footer;