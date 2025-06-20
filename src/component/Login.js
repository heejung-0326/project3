import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import axios from 'axios';

function Login(props) {
  const [form, setForm] = useState({
    userid: '',
    password: ''
  })
  const [idSave, setIdSave] = useState(false);

  useEffect(() => {
    const saveId = localStorage.getItem('saveId');
    if (saveId){
      setForm(prev => ({ ...prev, userid:saveId}));
      setIdSave(true);
    }
  }, []);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    setError('');
  }
  const handleIdSave = (e) => {
    setIdSave(e.target.checked);
    if(!e.target.checked){
      localStorage.removeItem('saveId');
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:9070/login`, form);

      if(res.data && res.data.token){
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userid', form.userid);
      localStorage.setItem('nickname', res.data.nickname);

      if(idSave){
        localStorage.setItem('saveId', form.userid);
      }
      
      alert('로그인성공');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('userId', data.userid);
      }
      navigate('/');
    }else{
      setError('로그인 실패 : 아이디 또는 비밀번호를 확인하세요.');
    }
    }catch{
        setError('로그인실패 : 아이디 또는 비밀번호를 확인하세요.')
      }
    } 

  return (
    <section className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">
        <img src={`${process.env.PUBLIC_URL}/images/login_logo.jpg`} alt="로고이미지" className="logo-img" />
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
            type="text" 
            id="userid" 
            name="userid" 
            value={form.userid} 
            onChange={handleChange}
            required />
            <label htmlFor="userid">아이디</label>
          </div>

          <div className="input-group">
            <input 
            type="password" 
            id="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange}
            required />
            <label htmlFor="password">비밀번호</label>
          </div>

          <p className="id-save">
            <label htmlFor="idsave">
            <input 
            type="checkbox" 
            id="idsave" 
            name="idsave"
            checked={idSave}
            onChange={handleIdSave}
            />
            아이디 저장</label>
          </p>

          <button type="submit">로그인</button>
          {error&&<p style={{color:'red'}}>{error}</p>}
        </form>

        <div className="links">
          <Link to="/id.search">아이디 찾기</Link>
          <span>|</span>
          <Link to="/pw.search">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/join">회원가입</Link>
        </div>

        <div className="social-login">
          <button
            className="naver"
            onClick={() =>
              window.open(
                'https://nid.naver.com/oauth2.0/authorize',
                '_blank'
              )
            }
          >
            네이버로 로그인
            <img src={`${process.env.PUBLIC_URL}/images/naver_icon.png`} alt="네이버 아이콘" />
          </button>

          <button
            className="kakao"
            onClick={() =>
              window.open(
                'https://kauth.kakao.com/oauth/authorize?client_id=카카오REST_API키&redirect_uri=http://localhost:3000/login&response_type=code',
                '_blank'
              )
            }
          >
            카카오톡으로 로그인
            <img src={`${process.env.PUBLIC_URL}/images/kakao_icon.png`} alt="카카오 아이콘" className="kakaoicon" />
          </button>
        </div>

        
      </div>
    </section>
  );
}

export default Login;