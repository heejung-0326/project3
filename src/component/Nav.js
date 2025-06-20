import React,{useState} from 'react';
import {Link} from 'react-router-dom';

function Nav(props) {
  const [hover, setHover]= useState([false,false,false,false,false]);

  const handleMouseEnter=(idx)=>{
    const update  = [...hover];
    update[idx] = true;
    setHover(update);
  }

  const handleMouseLeave=(idx)=>{
    const update  = [...hover];
    update[idx] = false;
    setHover(update);
  }
  return (
    <section className='nav'>
      <ul>
        <li>
          <Link to='/clothing' title='옷 보러가기'>
            <img src={hover[0] ? "/images/main/nav1_1.png" : "./images/main/nav1.png" } alt='옷 보러가기'
            onMouseEnter={()=>handleMouseEnter(0)}
            onMouseLeave={()=>handleMouseLeave(0)}/>
            <p>TOP</p>
          </Link>
        </li>

        <li>
          <div>
            <Link to='/shoes' title='신발 보러가기'>
              <img src={hover[1] ? "/images/main/nav2_1.png" : "./images/main/nav2.png"} alt='신발 보러가기' 
              onMouseEnter={()=>handleMouseEnter(1)}
              onMouseLeave={()=>handleMouseLeave(1)}/>
              <p>SHOES</p>
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to='/bag' title='가방 보러가기'>
              <img src={hover[2] ? "/images/main/nav3_1.png" : "./images/main/nav3.png"} alt='가방 보러가기'
              onMouseEnter={()=>handleMouseEnter(2)}
              onMouseLeave={()=>handleMouseLeave(2)}/>
              <p>BAG</p>
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to='/acc' title='악세서리 보러가기'>
              <img src={hover[3] ? "/images/main/nav4_1.png" : "./images/main/nav4.png"} alt='악세서리 보러가기'
              onMouseEnter={()=>handleMouseEnter(3)}
              onMouseLeave={()=>handleMouseLeave(3)}/>
              <p>ACC</p>
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to='/BEAUTY' title='뷰티 보러가기'>
              <img src={hover[4] ? "/images/main/nav5_1.png" : "./images/main/nav5.png"} alt='뷰티 보러가기'
              onMouseEnter={()=>handleMouseEnter(4)}
              onMouseLeave={()=>handleMouseLeave(4)}/>
              <p>BEAUTY</p>
            </Link>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Nav;