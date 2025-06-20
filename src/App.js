import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Header from './layout/Header'; //헤더
import HeaderSub from './layout/HeaderSub' //헤더 서브
import Footer from './layout/Footer'; //푸터
import Main from './component//Main'; //메인
import MobileHeader from './layout/MobileHeader'; //모바일 헤더
import MobileFooter from './layout/MobileFooter'; //모바일 푸터
// 서브1
import Clothing from './component/Clothing'; //옷
import Shoes from './component/Shoes'; //신발
import Bag from './component/Bag'; //가방
import Acc from './component/Acc'; //악세서리
import Beauty from './component/Beauty'; //뷰티

// 서브2
import BottomSub from './component/BottomSub';
import BootsSub from './component/BootsSub';
import PerfumeSub from './component/PerfumeSub';

// 장바구니, 글출력, 로그인, 회원가입, 글입력, 글수정, 채널톡
import Cart from './component/Cart';
import Mypage from './component/Mypage';
import Write from './component/Write';
import Edit from './component/Edit';
import Login from './component/Login';
import Join from './component/Join';
import ChannelTalk from './component/ChannelTalk';

// css
import './css/reset.css';
import './css/common.scss';
import './css/mobile_common.scss';

const Layout=({cartCount, setCartCount, userId, setUserId}) =>{
  const location = useLocation();

  // 모바일 해상도일 때
  const [Mobile, setMobile] = useState(window.innerWidth <= 767);
  const isMain = location.pathname === '/';

  useEffect(()=>{
    const handleResize =()=>{
      setMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);
    return ()=> window.removeEventListener('resize', handleResize);
  }, []);
  return(
    <>
      {Mobile ? <MobileHeader cartCount={cartCount} setCartCount={setCartCount}/> : (isMain ? <Header cartCount={cartCount} setCartCount={setCartCount} /> : <HeaderSub cartCount={cartCount} setCartCount={setCartCount} />)}
      
        <Routes>
        {/* header.js */}
          <Route path='/' element={<Main />}/>
          <Route path='/cart' element={<Cart userId={userId} setCartCount={setCartCount} />}/>
          
          <Route path='/login' element={<Login />}/>
          <Route path='/join' element={<Join />}/>
          {/* main.js */}
          <Route path='/clothing' element={<Clothing />}/>
          <Route path='/shoes' element={<Shoes />}/>
          <Route path='/bag' element={<Bag />}/>
          <Route path='/acc' element={<Acc />}/>
          <Route path='/beauty' element={<Beauty />}/>
          <Route path='/write' element={<Write /> }/>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/edit' element={<Edit />}/>
          <Route path="/mypage/edit/:id" element={<Edit />} /> 
          <Route path='/bottomsub' element={<BottomSub setCartCount={setCartCount} />}/>
          <Route path='/bootssub' element={<BootsSub setCartCount={setCartCount} />}/>
          <Route path='/perfumesub' element={<PerfumeSub setCartCount={setCartCount} />}/>
        </Routes>
        {Mobile ? <MobileFooter/> : <Footer />}
    </>
  );
}

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState(0);

  const handleLogin = (id) => {
    localStorage.setItem('userid', id);
    setUserId(id);
  }

  useEffect(() => {
    if(userId){
      fetch(`http://localhost:9070/cart?userId=${userId}`)
      .then(res => res.json())
      .then(data => setCartCount(data.length));
    }
  }, [userId]);
  
    ChannelTalk();

  return (
    <>
      <BrowserRouter>
      <Layout cartCount={cartCount} setCartCount={setCartCount} userId={userId} setUserId={setUserId}/>
      </BrowserRouter>
    </>
  );
}

export default App;
