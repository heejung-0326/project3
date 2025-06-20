import React,{useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const Header=({cartCount, setCartCount})=> {
  const [search,setSearch] = useState(false);
  const navigate = useNavigate();

  const isLogin = !!localStorage.getItem('userid');
  const nickname = localStorage.getItem('nickname');


    const handleMypageClick =()=>{
      if(isLogin){
        navigate('/mypage');
      }else{
        navigate('/login');
      }
    }

  const handleCartClick =()=>{
    if(isLogin){
      navigate('/cart');
    }else{
      navigate('/login');
    }
  }
  return (
    <header>
      {isLogin ?(
            <div className='login_join'>
              <Link to='/mypage'><strong>{nickname}</strong>님</Link>
              <button
              onClick={()=>{
                localStorage.removeItem('userid');
                localStorage.removeItem('nickname');
                setCartCount(0);
                alert('로그아웃되었습니다.');
                window.location.reload();
              }}
              style={{border:'none', background:'none'}}
              >로그아웃</button>
            </div>
            ) : (
              <div className='login_join'>
                <Link to='/login'>로그인</Link>
                <Link to='/join'>회원가입</Link>
              </div>
            )}
      <div className='h_inner'>
        <h1>
          <Link to='/' >
            <img src={`${process.env.PUBLIC_URL}/images/pc_logo.jpg`} alt='PC메인로고'/>
          </Link>
        </h1>
        <div className='h_right'>
          <button onClick={()=>setSearch(!search)} aria-label='검색하기'>
            <FontAwesomeIcon icon={faSearch}  className='h_search' id='search'/>
          </button>
          <button onClick={handleMypageClick} aria-label='내정보 바로가기'>
            <FontAwesomeIcon icon={faCircleUser} className='h_user'/>
          </button>

          <button onClick={handleCartClick} aria-label='장바구니 바로가기'>
            <img src={`${process.env.PUBLIC_URL}/images/box.jpg`} alt='장바구니 이미지' />

            {cartCount > 0 && 
            <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {search &&(
        <div className="input-group search_box">
          <input type="search" id="search_txt" required/>
          <label htmlFor="search_txt">SEARCH<FontAwesomeIcon icon={faSearch} className='search_icon'/></label>
        </div>
      )}
    </header>
  );
}

export default Header;