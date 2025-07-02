import React, { useRef, useState } from 'react';
import axios from 'axios';
import '../css/write.scss'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Write() {
  const fileInput = useRef(null);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: '',
    cate: '',
    price: '',
    status: '',
    desc: '',
    delivery:'',
    img: []
  })

  const handleImageClick = () => {
    fileInput.current.click();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    if(files.length > 10){
      alert('이미지는 최대 10장까지만 첨부할 수 있습니다.');
      e.target.value ='';
      return;
    }
    setForm(prev => ({...prev,img:files}));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userid = localStorage.getItem('userid');
      // console.log('userid', userid);
      const imgValue = Array.isArray(form.img)
          ? form.img[0]?.name || ''
          : form.img;
        await axios.post('http://localhost:9070/write', {
          ...form,
          img: imgValue, userid
        });
        alert('상품 등록이 완료되었습니다.');
        navigate('/mypage');
      } catch (err) {
        console.error(err);
        alert('상품 등록에 실패했습니다.');
      }
    };

  return (
    <form className='write-form' onSubmit={handleSubmit}>
      <h2>상품 등록</h2>
    <div>
      <ul className='upload'>
        <li>
        <img
          src={
            form.img && form.img.length > 0
            ? URL.createObjectURL(form.img[0])
            : `${process.env.PUBLIC_URL}/images/upload_icon.png`}
          alt="파일첨부"
          onClick={handleImageClick}
        />
        <input
          type='file'
          ref={fileInput}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileChange}
        />
        </li>
        <li style={{flex:'1'}}>
          <label>상품이미지<br />
          <span style={{display: 'block', color:'grey', fontSize:'12px', textAlign:'center', lineHeight: '30px'}}>(최대 10장)</span>
          </label>
          <div>
            {form.img && form.img.length > 0 && form.img.map((file, idx) => (
              <div key={idx} style={{ position: 'relative', marginRight: '8px' }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`미리보기${idx + 1}`}
                  className='thumb'
                />
                <button
                  className='remove-btn'
                  onClick={() => {
                    const newImgs = [...form.img];
                    newImgs.splice(idx, 1);
                    setForm(prev => ({ ...prev, img: newImgs }));
                  }}
                >×</button>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
    <div className='write'>
    <div className='input-group'>
      <input 
      type='text' 
      id="title" 
      name='title' 
      value={form.title} 
      onChange={handleChange} 
      required
      maxLength={50} />
      <label htmlFor='title' className="product-label">상품 이름</label>
    </div>

      <p className='title'>상품 카테고리</p>
      <p>
        <select name='cate' value={form.cate} onChange={handleChange}     className='write-select'>
          <option value=''></option>
          <option value='clothing'>Clothing</option>
          <option value='shoes'>Shoes</option>
          <option value='bag'>Bag</option>
          <option value='acc'>Acc</option>
          <option value='beauty'>Beauty</option>
        </select>
      </p>
      {form.cate && (
        <p className='cate-txt'>{form.cate}&nbsp;
        <FontAwesomeIcon icon={faXmark} onClick={() => setForm(prev => ({ ...prev, cate:''}))} aria-label="카테고리 삭제"
        />
      </p>
      )}
      <div className='price-status'>
        <div className='input-group price'>
        <input type='number' id="price" name='price' value={form.price} onChange={handleChange} required />
        <label htmlFor='price' className="product-label">상품 가격</label>
        </div>
        
        <p className="title status">사용감</p>
        <p className='status'>
          <select name='status' value={form.status} onChange={handleChange} className="status-select">
            <option value=''></option>
            <option value='상'>상</option>
            <option value='중'>중</option>
            <option value='하'>하</option>
          </select>
        </p>
      </div>

      <div className="input-group">
        <textarea
        id="desc" 
        name="desc" 
        value={form.desc} 
        onChange={handleChange} 
        rows="10" 
        required
        maxLength={500}>
        </textarea>
        <label htmlFor="desc" className="product-label">상품 설명</label>
        <span className='text'>
          {form.desc.length}/500
        </span>
      </div>

      <div className="radio-group">
      <p className='title'>배송비 선택</p>
        <input 
        type="radio" 
        name="delivery" 
        id="radio1"
        checked={form.delivery === '선불'}
        onChange={handleChange}
        value="선불"
        required />
        <label htmlFor='radio1'>선불</label>

        <input 
        type="radio" 
        name="delivery" 
        id='radio2'
        value="착불"
        checked={form.delivery === '착불'}
        onChange={handleChange} />
        <label htmlFor='radio2'>착불</label>
      </div>
      <button className='write-btn' type='submit'>상품 등록</button>
    </div>
    </form>
  );
}

export default Write;