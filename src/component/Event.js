import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Event(props) {
  return (
    <section className='event'>
      <h2>🎁 6월 응모이벤트</h2>
      
      <ul>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/main/event1.jpg`} alt='이벤트 이미지' />
          <p className='raffle'>응모하기
            <FontAwesomeIcon icon={faAngleRight} className='r_icon' />
          </p>
          <p>선착순 기회! 반바지 구매하고 럭키박스 응모 GO!</p>
          <p>~25.06.05</p>
        </li>

        <li>
          <img src={`${process.env.PUBLIC_URL}/images/main/event2.jpg`} alt='이벤트 이미지' />
          <p className='alarm'>알림받기</p>
          <p>시원하게 입고, 쿨하게 당첨되자! 반팔 응모 이벤트!</p>
          <p>25.06.06~25.06.08</p>
        </li>

        <li>
          <img src={`${process.env.PUBLIC_URL}/images/main/event3.jpg`} alt='이벤트 이미지' />
          <p className='alarm'>알림받기</p>
          <p>올여름, 유니폼으로 하나 되자! 구매하고 응모하자!</p>
          <p>25.06.9~25.06.11</p>
        </li>
      </ul>
    </section>
  );
}

export default Event;