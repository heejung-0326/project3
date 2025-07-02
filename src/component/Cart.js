import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Cart= ({userId, setCartCount})=> {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const navigate = useNavigate();
    // 모바일 해상도일 때
    const [Mobile, setMobile] = useState(window.innerWidth <= 767);
    useEffect(()=>{
      const handleResize =()=>{
        setMobile(window.innerWidth <= 767);
      };
      window.addEventListener('resize', handleResize);
      return ()=> window.removeEventListener('resize', handleResize);
    }, []);
    // 뒤로가기
    const handleBack=()=>{
      navigate(-1);
    }
useEffect(() => {
  const userId = localStorage.getItem('userid');
  if(!userId) {
    navigate('/');
    return;
  }
  fetch(`https://port-0-backend-mbeeoks1e1ce5c07.sel4.cloudtype.app/cart?userId=${userId}`)
    .then(res => res.json())
    .then(data => {
      setCartItems(data);
      setCheckedItems(new Array(data.length).fill(false));
      setCartCount(data.length);
      
    });
}, [userId, navigate]);
  

  const handleDelete = (idx) => {
    const item = cartItems[idx];
    if (!item) return;

    fetch(`https://port-0-backend-mbeeoks1e1ce5c07.sel4.cloudtype.app/cart/${item.no}`, {method: 'DELETE'})
    .then(()=> {
      const updated = cartItems.filter((_, i) => i !==idx);
      setCartItems(updated);
      setCartCount(updated.length);
    })
  }
  const handleDeleteSelected = () => {
  const selectedIds = cartItems
    .filter((_, idx) => checkedItems[idx])
    .map(item => item.no);
    
    if(selectedIds.length === 0) {
      alert('선택된 항목이 없습니다.');
      return;
    }

    Promise.all
      (selectedIds.map(no => 
      fetch(`https://port-0-backend-mbeeoks1e1ce5c07.sel4.cloudtype.app/cart/${no}`, { method: 'DELETE' })
    )).then(() => {
      const updated = cartItems.filter((_, idx) => !checkedItems[idx]);
      setCartItems(updated);
      setCheckedItems(new Array(updated.length).fill(false));
      setCartCount(updated.length);
    });
};

    const handleAllCheck = (e) => {
    setCheckedItems(new Array(cartItems.length).fill(e.target.checked));
  };
    // 개별 체크박스
  const handleItemCheck = (idx) => {
    setCheckedItems(checkedItems.map((checked, i) => i === idx ? !checked : checked));
  };

  const totalPrice = cartItems.reduce((sum, item, idx) => {
    return checkedItems[idx] ? sum + Number(item.price || 0) : sum;
  }, 0);
  const shipping = 3000;
  const totalPay = totalPrice + shipping;


// 페이지네이션

  const CartList = cartItems;
  const [CartPage, setCartPage] = useState(1);

  const pageSize = 5;

  const CartTotal = Math.ceil(CartList.length / pageSize);

  const getCurrentList = (list, page) =>{
    if(!Array.isArray(list)) return
    const start = (page-1) * pageSize;
    return list.slice(start, start+pageSize);
  };

    const renderPagination = (current, total, setPage) =>{
      return( 
      <div className='cart_pagination'>
        <button
        disabled={current ===1} onClick={()=>setPage(current - 1)}
        aria-label='좌측화살표'><FontAwesomeIcon icon={faAngleLeft}/></button>
        {[...Array(total)].map((_,i)=>(
          <button
          key={i} className={current === i + 1 ? 'pagecolor' : ''}
          onClick={()=>setPage(i+1)}
          >
            {i+1}
          </button>
        ))}
        <button disabled={current === total} onClick={()=>setPage(current + 1)} aria-label='우측화살표'><FontAwesomeIcon icon={faAngleRight}/></button>
      </div>
      );
    };
  return (
    <section className='cart'>
      {Mobile ? <div className='back' onClick={handleBack}><FontAwesomeIcon icon={faAngleLeft}/></div> : ''}
      <h2 className='cart_title'>장바구니</h2>
      <div className="wrap">
        <div className='left'>
          <p className='all'>
            <input
              type="checkbox"
              id="all"
              checked={checkedItems.length > 0 && checkedItems.every(Boolean)}
              onChange={handleAllCheck}
            />
            <label htmlFor="all">전체선택</label>
            <span className='all-del' onClick={handleDeleteSelected}>선택삭제</span>
          </p>

          <ul className={cartItems.length === 0 ? "empty" : ""}>
            {cartItems.length === 0 ? (
              <li style={{textIndent:'10px'}}>장바구니가 비어 있습니다</li>
            ) : (
              getCurrentList(cartItems, CartPage).map((item, idx) => (
                <li key={item.no} className='cart-item-row'>
                  <input
                    type="checkbox"
                    id={`item${idx}`}
                    checked={checkedItems[idx] || false}
                    onChange={() => handleItemCheck(idx)}
                  />
                  <div className='cart-item-img'>
                    <img src={(item.img ? item.img.replace(/\.png$/i, '.jpg') : item.image)} alt={item.title || item.name} fetchpriority="high"/>
                  </div>
                  <div className='cart-item-info'>
                    <label htmlFor={`item${idx}`} className='cart-item-title'>{item.title || item.name}</label>
                    <p>{item.title}</p>
                    <p className='item-desc'>{item.desc}</p>
                    <p className='price'>{Number(item.price || 0).toLocaleString()}원</p>
                  </div>
                  <span onClick={() => handleDelete(idx)}>삭제</span>
                </li>
              ))
            )}
          </ul>
          <div>
            {renderPagination(CartPage, CartTotal, setCartPage)}
          </div>
        </div>

        <div className='right'>
          <h3 className='right-title'>결제정보</h3>
          <ul>
            <li>총 상품금액 : <span>{totalPrice.toLocaleString()}원</span></li>
            <li>배송비 : <span>{shipping.toLocaleString()}원</span></li>
            <li>총 결제금액 : <span>{totalPay.toLocaleString()}원</span></li>
          </ul>
          <button
            onClick={async () => {
              if (totalPrice === 0) {
                alert('선택된 상품이 없습니다.');
              } else {
                alert('결제가 완료되었습니다.');
                const selectedNos = cartItems
                  .filter((_, idx) => checkedItems[idx])
                  .map(item => item.no);
                const updated = cartItems.filter((_, idx) => !checkedItems[idx]);
                setCartItems(updated);
                setCheckedItems(new Array(updated.length).fill(false));
                setCartCount(updated.length);

                await Promise.all(
                  selectedNos.map(no =>
                    fetch(`https://port-0-backend-mbeeoks1e1ce5c07.sel4.cloudtype.app/cart/${no}`, { method: 'DELETE' })
                  )
                );
                navigate('/');
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>


    </section>
  );
}

export default Cart;
