import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const HeaderSub=({cartCount, setCartCount})=>{
  const [search,setSearch] = useState(false);
  const navigate=useNavigate();

  const isLogin = !!localStorage.getItem('userid');
  const nickname = localStorage.getItem('nickname');

  const handleMypageClick =()=>{
    if(isLogin){
      navigate('/mypage');
      window.location.reload();
    }else{
      navigate('/login');
    };
  }

  const handleCartClick =()=>{
    if(isLogin){
      navigate('/cart');
      window.location.reload();
    }else{
      navigate('/login');
    }
  }
  return (
    <header>
      {isLogin ?(
      <div className='login_join'>
        <Link to='/mypage' title='마이페이지 가기'><strong>{nickname}</strong>님</Link>
          <button
          aria-label='로그아웃'
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
          <Link to='/login' title='로그인'>로그인</Link>
          <Link to='/join' title='회원가입'>회원가입</Link>
        </div>
      )}
      <div className='h_inner'>
        <h1>
          <Link to='/' title='홈으로 가기'>
            <img src={`${process.env.PUBLIC_URL}/images/pc_logo.jpg`} alt='PC메인로고'/>
          </Link>
        </h1>

        {/* 내비게이션 서식 */}
        <div className='navi'>
          <nav>
            <ul className='gnb'>
              <li>
                <Link to='/clothing' title='옷'>CLOTHING</Link>
                <ul className='lnb'>
                  <li><Link to='/clothing' title='TOP'>TOP</Link></li>
                  <li><Link to='/clothing' title='bottom'>Bottom</Link></li>
                  <li><Link to='/clothing' title='outer'>OUTER</Link> </li>
                </ul>
              </li>

              <li>
                <Link to='/shoes' title='신발'>SHOES</Link>
                <ul className='lnb'>
                  <li><Link to='/shoes' title='sneakers'>SNEAKERS</Link></li>
                  <li><Link to='/shoes' title='boots'>BOOTS</Link></li>
                  <li><Link to='/shoes' title='sandals'>SANDALS</Link></li>
                </ul>
              </li>

              <li>
                <Link to='/bag' title='가방'>BAG</Link>

                <ul className='lnb'>
                  <li><Link to='/bag' title='WALLET'>WALLET</Link></li>
                  <li><Link to='/bag' title='minibag'>MINIBAG</Link></li>
                  <li><Link to='/bag' title='backpack'>BACKPACK</Link></li>
                </ul>
              </li>

              <li>
                <Link to='/accessory' title='악세서리'>ACCESSORY</Link>
                <ul className='lnb'>
                  <li><Link to='/accessory' title='necklace'>NECKLACE</Link></li>
                  <li><Link to='/accessory' title='bracelet'>BRACELET</Link></li>
                  <li><Link to='/accessory' title='watch'>WATCH</Link> </li>
                  </ul>
              </li>

              <li>
                <Link to='/beauty' title='뷰티'>BEAUTY</Link>
                <ul className='lnb'>
                  <li><Link to='/beauty' title='skincare'>SKINCARE</Link></li>
                  <li><Link to='/beauty' title='perfume'>PERFUME</Link></li>
                  <li><Link to='/beauty' title='haircare'>HAIRCARE</Link> </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        {/* 헤더오른쪽 서식  */}
        <div className='h_right'>
          <button onClick={()=>setSearch(!search)} aria-label='검색하기'>
            <FontAwesomeIcon icon={faSearch}  className='h_search' id='search'/>
          </button>
          <button onClick={handleMypageClick} aria-label='내정보 바로가기'>
            <FontAwesomeIcon icon={faCircleUser} className='h_user'/>
          </button>
          <button onClick={handleCartClick} aria-label='장바구니 바로가기'>
            <img src={`${process.env.PUBLIC_URL}/images/box.jpg`} alt='장바구니 이미지'/>
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
};

export default HeaderSub;