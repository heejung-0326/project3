import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faHouse,faXmark, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
function MobileHeader({cartCount, setCartCount}){
  const [search,setSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menutoggle, setMenuToggle] = useState({
    clothing:false,
    shoes:false,
    bag:false,
    acc:false,
    beauty:false
  });
  const navigate = useNavigate();
  
  const handleMenuToggle=(menuName)=>{
    setMenuToggle(prev =>({
      ...prev, [menuName] : !prev[menuName]
    }));
  };

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
    <header className='mobile_header'>

      {search &&(
        <div class="input-group search_box">
          <input type="search" id="search_txt" required/>
          <label htmlFor="search_txt">SEARCH<FontAwesomeIcon icon={faSearch} className='search_icon'/></label>
        </div>
      )}
      
      <div className='mobile_menu_bg' style={{
        backgroundColor:menuOpen ? "rgba(0,0,0,0.8)" : "transparent", transition:'0.5s',left:menuOpen ? "0%" : "-100%"
      }}>
        {/* 로그인 전 로그인 회원가입 버튼 */}
        <div className='mobile_menu' style={{right: menuOpen ? "0%" : "-100%", transition:"0.5s"}}>
          <button onClick={()=>setMenuOpen(false)} aria-label='닫기 버튼'>
            <FontAwesomeIcon icon={faXmark} className='close_btn'/>
          </button>
      {isLogin ?(
      <div className='mobile_login_box'>
        <Link to='/mypage' onClick={()=>setMenuOpen(false)}><strong>{nickname}</strong>님</Link>
        <button
        onClick={()=>{
          localStorage.removeItem('userid');
          localStorage.removeItem('nickname');
          setCartCount(0);
          setMenuOpen(false);
          navigate('/');
        }}
        aria-label='로그아웃'
        style={{border:'none', background:'none', fontSize:'1rem'}}
        >로그아웃</button>
      </div>
      ) : (
        <div className='mobile_login_box'>
          <Link to='/login' onClick={()=>setMenuOpen(false)}>로그인</Link>
          <Link to='/join' onClick={()=>setMenuOpen(false)}>회원가입</Link>
        </div>
      )}

          <ul className='mobile_gnb'>
            <li  style={{borderBottom: menutoggle.clothing ? '2px solid #ddd' : 'none', transition:'0.3s',borderRight: menutoggle.clothing ? '2px solid #ddd' : 'none'}}>

              <button onClick={()=>handleMenuToggle("clothing")}>CLOTHING&nbsp;<FontAwesomeIcon icon={faAngleDown} style={{transform: menutoggle.clothing ? 'rotate(180deg)' : 'rotate(0deg)',transition: '0.5s'}} aria-label='옷 보러가기'/></button>
        
              <ul className='mobile_lnb' style={{maxHeight: menutoggle.clothing ? '300px' : '0', overflow:'hidden', transition:'0.5s'}}>
                <li onClick={()=>setMenuOpen(false)}><Link to='/clothing' title='top'>TOP</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/clothing' title='bottom'>BOTTOM</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/clothing' title='outer'>OUTER</Link></li>
              </ul>
            </li>

            <li style={{borderBottom: menutoggle.shoes ? '2px solid #ddd' : 'none', transition:'0.3s',borderRight: menutoggle.shoes ? '2px solid #ddd' : 'none'}}>

              <button onClick={()=>handleMenuToggle("shoes")}>SHOES&nbsp;<FontAwesomeIcon icon={faAngleDown} style={{transform: menutoggle.shoes ? 'rotate(180deg)' : 'rotate(0deg)',transition: '0.5s'}} aria-label='신발 보러가기'/></button>

              <ul className='mobile_lnb' style={{maxHeight: menutoggle.shoes ? '300px' : '0', overflow:'hidden', transition:'0.5s'}}>
                <li onClick={()=>setMenuOpen(false)}><Link to='/shoes' title='sneakers'>SNEAKERS</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/shoes' title='boots'>BOOTS</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/shoes' title='sandals'>SANDALS</Link></li>
              </ul>
            </li>

            <li style={{borderBottom: menutoggle.bag ? '2px solid #ddd' : 'none', transition:'0.3s', borderRight: menutoggle.bag ? '2px solid #ddd' : 'none'}}>

              <button onClick={()=>handleMenuToggle("bag")}>BAG&nbsp;<FontAwesomeIcon icon={faAngleDown} style={{transform: menutoggle.bag ? 'rotate(180deg)' : 'rotate(0deg)',transition: '0.5s'}} aria-label='가방 보러가기'/></button>

              <ul className='mobile_lnb' style={{maxHeight: menutoggle.bag ? '300px' : '0', overflow:'hidden', transition:'0.5s'}}>
                <li onClick={()=>setMenuOpen(false)}><Link to='/bag' title='wallet'>WALLET</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/bag' title='minibag'>MINIBAG</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/bag' title='backpack'>BACKPACK</Link></li>
              </ul>
            </li>

            <li style={{borderBottom: menutoggle.acc ? '2px solid #ddd' : 'none', transition:'0.3s',borderRight: menutoggle.acc ? '2px solid #ddd' : 'none'}}>

              <button onClick={()=>handleMenuToggle("acc")}>ACC&nbsp;<FontAwesomeIcon icon={faAngleDown} style={{transform: menutoggle.acc ? 'rotate(180deg)' : 'rotate(0deg)',transition: '0.5s'}} aria-label='악세서리 보러가기'/></button>

              <ul className='mobile_lnb' style={{maxHeight: menutoggle.acc ? '300px' : '0', overflow:'hidden', transition:'0.5s'}}>
                <li onClick={()=>setMenuOpen(false)}><Link to='/acc'>NECKLACE</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/acc' title='bracelet'>BRACELET</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/acc' title='watch'>WATCH</Link></li>
              </ul>
            </li>

            <li style={{borderBottom: menutoggle.beauty ? '2px solid #ddd' : 'none', transition:'0.3s',borderRight: menutoggle.beauty ? '2px solid #ddd' : 'none'}}>

              <button onClick={()=>handleMenuToggle("beauty")}>BEAUTY&nbsp;<FontAwesomeIcon icon={faAngleDown} style={{transform: menutoggle.beauty ? 'rotate(180deg)' : 'rotate(0deg)',transition: '0.5s'}}/></button>

              <ul className='mobile_lnb' style={{maxHeight: menutoggle.beauty ? '300px' : '0', overflow:'hidden', transition:'0.5s'}}>
                <li onClick={()=>setMenuOpen(false)}><Link to='/beauty' title='skincare'>SKINCARE</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/beauty' title='perfume'>PERFUME</Link></li>
                <li onClick={()=>setMenuOpen(false)}><Link to='/beauty' title='haircare'>HAIRCARE</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <button onClick={()=>setMenuOpen(true)} aria-label='메뉴버튼'><FontAwesomeIcon icon={faBars}/></button>
            <p>메뉴</p>
          </li>
          
          <li>
            <button onClick={()=>setSearch(!search)} aria-label='검색하기'><FontAwesomeIcon icon={faSearch}/></button>
            <p>검색</p>
          </li>

          <li>
            <Link to='/' onClick={()=>setMenuOpen(false)} title='홈으로 가기'><FontAwesomeIcon icon={faHouse}/></Link>
            <p>홈</p>
          </li>

          <li>
            <button onClick={()=>{
              setMenuOpen(false); 
              handleMypageClick();}}
              aria-label='내정보 바로가기'
              >
                <FontAwesomeIcon icon={faCircleUser} className='user_icon'/></button>
            <p>내정보</p>
          </li>

          <li>
            <button
            onClick={()=>{
            setMenuOpen(false);
            handleCartClick();}}
            aria-label='장바구니 바로가기'>
              <img src={`${process.env.PUBLIC_URL}/images/box.jpg`} alt='장바구니 이미지'/>

              {cartCount > 0 &&
              <span className='cart-badge'>{cartCount}</span>
              }
            </button>
            <p>장바구니</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MobileHeader;