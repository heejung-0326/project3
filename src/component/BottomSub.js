import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sub2.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faHeart, faChevronDown, faWindowRestore } from '@fortawesome/free-solid-svg-icons';

// 공지사항 앵글 업다운 
function NoticeToggle({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNotice = () => {
    setIsOpen((prev) => !prev); // 상태 토글
    console.log("isOpen 상태:", !isOpen);
  };

  return (
    <div className="notice-toggle">
      <div className="notice-header" onClick={toggleNotice}>
        <span>{title}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`arrow-icon ${isOpen ? "open" : ""}`}
        />

        
      </div>
      <ul
        className={`notice-content ${isOpen ? "open" : ""}`}>
        {children}
      </ul>
    </div>
  );
}

// nego 클릭시 알림톡 채팅창 띄우기
const BottomSub=({setCartCount}) => {
  // 썸네일 이미지 클릭시 이미지 스크롤 다운
  const imageRefs = useRef([]);
  const [targetImage, setTargetImage] = useState(null);
  const navigate = useNavigate();

  // 장바구니 추가 시 모달창 띄우기
  const [isModalOpen, setIsModalOpen] = useState(false);


  const thumbnails = [
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing_pre1.png`,
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing_pre2.png`,
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing_pre3.png`,
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing_pre5.png`,
  ];
  
  const mainImages = [
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing1.png`,
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing2.png`,
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing3.png`,
    `${process.env.PUBLIC_URL}/images/sub2/sub2_clothing/clothing5.png`,
  ];

  const product = {
    id: 1,
    title: "Dime",
    desc: "Classic Relaxed Denim Pants",
    img: mainImages[0],
    price: 223000
  };
  
  const userId = localStorage.getItem('userid') || '';
  // 장바구니 추가
  const addToCart = async () => {
    if(!userId){
      alert('로그인이 필요합니다.');
      return
    }
    try{
      const res = await fetch('http://localhost:9070/cart', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        userId: userId,
        product:product
        })
      });
    if(res.ok){
      setIsModalOpen(true);
      try{
      const updatedRes = await fetch(`http://localhost:9070/cart?userId=${userId}`);
      const updatedCart = await updatedRes.json();
      setCartCount(updatedCart.length);
      window.dispatchEvent(new Event('cartChanged'));
      }catch(parseErr){
        console.error('JSON파싱오류:', parseErr)
      }
    }else{
      alert('장바구니 담기에 실패했습니다.');
    }
  }catch(err){
    console.error('addToCart 오류:', err);
    alert('서버오류');
  }
};

//구매하기
  const handleBuyNow = async() => {
    if(!userId){
      alert('로그인이 필요합니다.');
    return;
    }
    try {
      const res = await fetch('http://localhost:9070/cart', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        userId: userId,
        product:product
        })
      });

      if(res.ok) {
        navigate('/cart');
      }else{
        alert('장바구니 담기에 실패했습니다.');
      }
    }catch(err){
      alert('서버 오류');
    }
  };

  const closeModal = () => {
    // console.log("closeModal 호출됨");
    setIsModalOpen(false);
  };

  // 스크롤 동작
  useEffect(() => {
    if (targetImage !== null && imageRefs.current[targetImage]) {
      const element = imageRefs.current[targetImage];
      const headerOffset = 110; // 헤더 높이 만큼 조절
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementTop - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [targetImage]);

  return (
    <div className="sub2-container">
      <div className="image-setion">
        <div className="thumbnail-list">
          {thumbnails.map((src, image) => (
            <img
              key={image}
              src={src}
              alt="썸네일"
              onClick={() => setTargetImage(image)}
            />
          ))}
        </div>
        <div className="main-images">
          {mainImages.map((src, image) => (
            <div key={image} ref={(el) => (imageRefs.current[image] = el)}> 
              <img src={src} alt={`상품이미지${image + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="info-section">
        <p className="heart"><FontAwesomeIcon icon={faHeart} /></p>
        <h2 className="product_title">{product.title} {product.desc}</h2>
        <div className="price-date-wrapper">
          <div className="price">223,000원</div>
          <div className="date">25-05-22</div>
        </div>
        <div className="nickname-report-wrapper">
          <div className="nickname">닉네임</div>
          <div className="report">신고하기</div>
        </div>
        <ul className="product-info">
          <li>제품명 : 연청 데님 진 (남/여 공용)</li>
          <li>사이즈 : M (허리 29-30인치 / 총장 약 95cm)</li>
          <li>소재 : 면 100%</li>
          <li>색상 : 연청 (Light Blue Denim)</li>
          <li>브랜드 : Dime</li>
        </ul>

        <div className="like-chatting">
          <p>관심 10 &middot; 채팅 3</p>
        </div>

        <div className="button">
          <button className="cart" onClick={addToCart}>장바구니</button>
          <button className="buy" onClick={handleBuyNow}>구매하기</button>
          <button className="NEGO" onClick={() => window.ChannelIO('showMessenger')}>
            <FontAwesomeIcon icon={faMessage} className="msg-icon" />NEGO?
          </button>
        </div>

        {/* 모달창 */}
        {isModalOpen && (
          <div className="modal-wrapper">
            <div className="modal">
              <p>{product.desc}이(가) 장바구니에 추가되었습니다.</p>
              <button onClick={closeModal}>닫기</button>
              </div>
              </div>
        )}

        <div className="notice">
          <NoticeToggle title="구매시 주의 사항">
            <li>중고 상품 특성상 사용감이나 하자가 있을 수 있으니 구매 전 상품 상태를 꼼꼼히 확인해주세요.</li>
            <li>상품에 대한 문의는 판매자에게 채팅을 통해 확인하실 수 있습니다.</li>
            <li>거래 후 발생하는 문제는 당사에서 책임지지 않으니 신중한 구매 부탁드립니다.</li>
          </NoticeToggle>

          <NoticeToggle title="배송안내">
            <li>배송 방법은 판매자에 따라 다를 수 있으며, 직거래 또는 택배 거래 중 선택하실 수 있습니다.</li>
            <li>택배 거래 시 발송 기한은 판매자와 직접 조율해 주세요.</li>
            <li>배송 중 발생한 분실이나 파손에 대한 책임은 당사에서 지지 않습니다.</li>
          </NoticeToggle>

          <NoticeToggle title="반품 및 환불 안내">
            <li>중고 상품의 특성상 단순 변심에 의한 반품 및 환불은 불가능합니다.</li>
            <li>상품 설명과 현저히 다른 경우, 판매자와 직접 협의하여 조치를 요청해 주세요.</li>
            <li>안전한 거래를 위해 거래 내역과 채팅 내용을 보관하시길 권장합니다.</li>
          </NoticeToggle>
        </div>
      </div>
    </div>
  );
}

export default BottomSub;
