import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../css/mypage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPencil } from '@fortawesome/free-solid-svg-icons';
import dummy from '../data/item.json';
import axios from 'axios';

function Mypage() {
  const navigate = useNavigate();
  // 판매중 0, 구매중 1, 완료 2
  const [tab, setTab] = useState(0);

  // 리스트
  const [sellingList, setSellingList] = useState([]);
  const buyingList = dummy.item;
  const completeList = dummy.complete;

  // 체크박스 상태변수
  const [sellingChecked, setSellingChecked] = useState([]);
  const [buyingChecked, setBuyingChecked] = useState([]);

  useEffect(() => {
    const userid = localStorage.getItem('userid');
    if(!userid){
      alert('로그인 후 이용해주세요.');
      navigate('/login');
      return;
    }
    axios.get(`https://port-0-backend-mbeeoks1e1ce5c07.sel4.cloudtype.app/mypage/${userid}`)
      .then(res => {
        setSellingList(res.data);
        setSellingChecked(Array(res.data.length).fill(false));
      })
      .catch(err => console.error(err));
  }, []);

  // 전체선택(판매중)
  const handleSellingAllCheck = (e) => {
    setSellingChecked(Array(sellingList.length).fill(e.target.checked));
  };

  // 전체선택(구매중)
  const handleBuyingAllCheck = (e) => {
    setBuyingChecked(Array(buyingList.length).fill(e.target.checked));
  };

  // 개별선택(판매중)
  const handleSellingCheck = (idx) => (e) => {
    const checkbox = [...sellingChecked];
    checkbox[idx] = e.target.checked;
    setSellingChecked(checkbox);
  };
  const isSellingAllChecked = sellingChecked.length > 0 && sellingChecked.every(Boolean);

  // 개별선택(구매중)
  const handleBuyingCheck = (idx) => (e) => {
    const checkbox = [...buyingChecked];
    checkbox[idx] = e.target.checked;
    setBuyingChecked(checkbox);
  };
  const isBuyingAllChecked = buyingChecked.length > 0 && buyingChecked.every(Boolean);

  // 페이지네이션
  const [sellingPage, setSellingPage] = useState(1);
  const [buyingPage, setBuyingPage] = useState(1);
  const [completePage, setCompletePage] = useState(1);

  const pageSize = 5;
  const sellingTotal = Math.ceil(sellingList.length / pageSize);
  const buyingTotal = Math.ceil(buyingList.length / pageSize);
  const completeTotal = Math.ceil(completeList.length / pageSize);

  const getCurrentList = (list, page) => {
    if (!Array.isArray(list)) return [];
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  };

  const renderPagination = (current, total, setPage) => {
    return (
      <div className='pagination'>
        <button disabled={current === 1} onClick={() => setPage(current - 1)} aria-label='이전'>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {[...Array(total)].map((_, i) => (
          <button
            aria-label='페이지 넘버'
            key={i}
            className={current === i + 1 ? 'pagecolor' : ''}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={current === total} onClick={() => setPage(current + 1)} aria-label='다음'>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    );
  };

  // 판매중 삭제하기 클릭시 경고창 띄우기
  const handleSellingCancel = () => {
    if (!sellingChecked.some(Boolean)) {
      alert('상품을 선택해주세요.');
      return;
    }
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const currentList = getCurrentList(sellingList, sellingPage);
const startIdx = (sellingPage - 1) * pageSize;
const toDelete = currentList
  .map((item, idx) => ({ item, globalIdx: startIdx + idx }))
  .filter((_, idx) => sellingChecked[idx])
  .map(({ item }) => item.id);

Promise.all(
  toDelete.map(id =>
    axios.delete(`https://port-0-backend-mbeeoks1e1ce5c07.sel4.cloudtype.app/selling/${id}`)
  )
)
  .then(() => {
    setSellingList(prev => prev.filter(item => !toDelete.includes(item.id)));

    const updatedList = getCurrentList(
      sellingList.filter(item => !toDelete.includes(item.id)),
      sellingPage
    );
    setSellingChecked(Array(updatedList.length).fill(false));
  })
  .catch(err => console.error(err));
  };


  const handleBuyCancel = () => {
    if (!buyingChecked.some(Boolean)) {
      alert('상품을 선택해주세요.');
      return;
    }
    const reason = prompt('구매를 취소하시는 이유를 입력해주세요.');
    if (window.ChannelIO && reason) {
      window.ChannelIO('showMessenger');
      window.ChannelIO('track', '구매취소사유', { message: `사용자가 구매취소를 요청했습니다. 사유 : ${reason}` });
      window.ChannelIO('sendMessage', {
        type: 'text', text: `구매취소 요청\n사유:${reason}`
      });
    }
  };

  // 데이터 값 년월일
  const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};

 // 모바일 해상도일 때
  const [Mobile, setMobile] = useState(window.innerWidth <= 767);
  useEffect(()=>{
    const handleResize =()=>{
      setMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);
    return ()=> window.removeEventListener('resize', handleResize);
  }, []);
  const handleBack=()=>{
    navigate(-1);
  }
  return (
    <section className='mypage'>
      {Mobile ? <div className='back' onClick={handleBack}><FontAwesomeIcon icon={faAngleLeft}/></div> : ''}
      <h2>내정보</h2>
      <div className='mypage_btn'>
        <button aria-label='판매중' className={tab === 0 ? 'clickcolorchange' : ''} onClick={() => setTab(0)}>판매중</button>
        <button aria-label='구매중' className={tab === 1 ? 'clickcolorchange' : ''} onClick={() => setTab(1)}>구매중</button>
        <button aria-label='완료' className={tab === 2 ? 'clickcolorchange' : ''} onClick={() => setTab(2)}>완료</button>
      </div>

      {/* 판매중 */}
      <article className='selling' style={{ display: tab === 0 ? 'block' : 'none' }}>
        <div className='delete_box'>
          <div>
            <input
              type='checkbox'
              name='selling_allcheck'
              id='selling_allcheck'
              checked={isSellingAllChecked}
              onChange={handleSellingAllCheck}
            />
            <label htmlFor='selling_allcheck'>전체선택</label>
          </div>
          <button className='delete_btn' onClick={handleSellingCancel} aria-label='삭제하기'>삭제하기</button>
        </div>

        {getCurrentList(sellingList, sellingPage).map((item, idx) => (
          <div className='product' key={item.id}>
            <input
              type='checkbox'
              name='select'
              id={`select${item.id}`}
              checked={sellingChecked[idx]}
              onChange={handleSellingCheck(idx)}
            />
            <label htmlFor={`select${item.id}`} className='nonelabel'>선택</label>
            <img src={process.env.PUBLIC_URL + '/images/mypage/' + item.img} className='product_img' alt='상품이미지'/>
            <div className='product_txt'>
              <p>{item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title}</p>
              <p><span>종류 : </span>{item.cate}</p>
              <p><span>가격 : </span>{Number(item.price).toLocaleString()}원</p>
              <p><span>상품상태 : </span>{item.status}</p>
              <p className='product_desc'><span>상품설명 : </span>{item.desc.length > 5 ? item.desc.slice(0, 5) + '...' : item.desc}</p>
              <p><span>배송 : </span>{item.delivery}</p>
              <p><span>작성날짜 : </span>{formatDate(item.date)}</p>
            </div>
            <button className='edit_btn' onClick={()=>navigate(`/mypage/edit/${item.id}`)} aria-label='수정하기로 이동'>
              수정하기
            </button>
            
          </div>
        ))}
        {renderPagination(sellingPage, sellingTotal, setSellingPage)}
        <button className='selling_btn' aria-label='글쓰기'>
          <Link to='/write' title='글쓰기'>
            {Mobile ? (<FontAwesomeIcon icon={faPencil} />):(<div>글쓰기</div>)}
            
          </Link>
        </button>
      </article>

      {/* 구매중 및 완료 탭은 기존 dummy 로직 유지 */}

{/* 구매중 */}
      <article className='buying'
      style={{display:tab === 1 ? 'block' : 'none'}}
      >
        <div className='delete_box'>
          <div>
            <input type='checkbox' name='buying_allcheck' id='buying_allcheck'
            checked={isBuyingAllChecked}
            onChange={handleBuyingAllCheck}
            />
            <label htmlFor='buying_allcheck'>전체선택</label>
          </div>
          <button className='delete_btn' onClick={handleBuyCancel} aria-label='구매취소'>구매취소</button>
        </div>

        {getCurrentList(buyingList, buyingPage).map((item, idx)=>(
          <div className='product' key={item.id}>
            <input type='checkbox' name='select2' id={`select2${item.id}`}
            checked={buyingChecked[idx]}
            onChange={handleBuyingCheck(idx)}
            />
            <label htmlFor={`select2${item.id}`} className='nonelabel'>선택</label>
            <img src={process.env.PUBLIC_URL + '/images/mypage/' + item.img} className='product_img' alt='상품이미지'/>
            <div className='product_txt'>
            <p>{item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title}</p>
            <p><span>종류 : </span>{item.cate}</p>
            <p><span>가격 : </span>{Number(item.price).toLocaleString()}원</p>
            <p><span>상품상태 : </span>{item.status}</p>
            <p className='product_desc'><span>상품설명 : </span>{item.desc.length > 12 ? item.desc.slice(0, 12) + '...' : item.desc}</p>
            <p><span>배송 : </span>{item.delivery}</p>
            <p><span>작성날짜 : </span>{item.date}</p>
            </div>
          </div>
        ))}
        {renderPagination(buyingPage, buyingTotal, setBuyingPage)}  
      </article>

      {/* 완료 */}
      <article className='complete'
      style={{display:tab === 2 ? 'block' : 'none'}}
      >

        {getCurrentList(completeList, completePage).map(complete=>(
          <div className='product'>
            <img src={process.env.PUBLIC_URL+ '/images/mypage/' + complete.img} className='product_img' alt='상품이미지'/>
            <div className='product_txt'>
            <p>{complete.title}</p>
            <p><span>종류 : </span>{complete.cate}</p>
            <p><span>가격 : </span>{Number(complete.price).toLocaleString()}원</p>
            <p><span>상품상태 : </span>{complete.status}</p>
            <p className='product_desc'><span>상품설명 : </span>{complete.desc.length > 5 ? complete.desc.slice(0, 5) + '...' : complete.desc}</p>
            <p><span>배송 : </span>{complete.delivery}</p>
            <p><span>작성날짜: </span>{complete.date}</p>
            <p>상태 : {complete.sellbuy}</p>
            </div>
          </div>
        ))}
        {renderPagination(completePage, completeTotal, setCompletePage)}  
      </article>
    </section>
  );
}

export default Mypage;
