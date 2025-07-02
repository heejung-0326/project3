import React, {useState, useEffect} from 'react';
import '../css/sub1.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import dummy from '../data/Shoes.json'

const TabList = ({click, setClick}) => (
  <ul className='tag_box'>
    {['sneakers','boots','sandals'].map(type => (
      <li
      key={type}
      className={`tag ${click === type ? 'active' : ''}`}
      onClick={() => setClick(type)}
      >
        #{type.toUpperCase()}
      </li>
    ))}
  </ul>
);

const Shoes = () =>{
  const [click, setClick] = useState('sneakers');
  const items = dummy[click];

useEffect(() => {
  window.scrollTo(0,0);
}, []);

return (
<>
  <section className='shoes-video'>
    <h2>video 영역</h2>
    <video muted autoPlay loop>
      <source src={`${process.env.PUBLIC_URL}/video/shoes.mp4`} type="video/mp4"/>
    </video>
  </section>

  <div className='shoes'>
    <article className={`${click}-content`}>
    <h2>{click.toUpperCase()}</h2>
    <TabList click={click} setClick={setClick}/>

    <div className='shoes-image'>
      <div className='left-image'>
        <img 
        src={`${process.env.PUBLIC_URL}/images/sub1/shoes/${items[0].img}`} alt={items[0].title || '대표이미지'} />
      </div>

      <div className='right-image'>
        <p className='more-btn'>
          더보기 <FontAwesomeIcon icon={faAngleRight} size="md" color="#222222" />
        </p>

          <ul>
            {items.slice(1).map(item => (
            <li key={item.id}>
              <Link to="/BootsSub">
              <div>
                <img 
                src={`${process.env.PUBLIC_URL}/images/sub1/shoes/${item.img}`} alt={item.title} /></div>
            <p className='title'>{item.title}</p>
            <p className='price'>{Number(item.price).toLocaleString()}원</p>
            <p className='likes'>
              <FontAwesomeIcon icon={faHeart} size='md' color='#f00' />
              &nbsp;{item.likes}
            </p>
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
  </div>
</>
);
};

export default Shoes;

