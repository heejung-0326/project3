import React, { useState } from 'react';
import '../css/join.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join() {
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  //회원가입 변수
  const [form, setForm] = useState({
    userid:'',
    password:'',
    password2:'',
    nickname:'',
    email:''
  });
  const [error, setError] = useState(''); //에러시 출력
  const [success, setSuccess] = useState(''); //성공시 출력
  const navigate = useNavigate(); //회원가입 성공시 로그인화면으로 이동.

  // 글 작성시 작동하는 함수
  const handleChange=(e)=>{
    setForm({...form,
      [e.target.name]:e.target.value
    });
    setError('');
    setSuccess('');
  };


// 모달 및 개인정보 동의
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  const handleAgreementChange = (key) => {
    const newValue = !agreements[key];
    const updated = { ...agreements, [key]: newValue };
    updated.all = updated.age && updated.terms && updated.privacy;
    setAgreements(updated);
  };

  const handleAllAgreement = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      age: newValue,
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.password !== form.password2){
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try{
      await axios.post('http://localhost:9070/join',{
        userid:form.userid,
        password:form.password,
        nickname:form.nickname,
        email:form.email
      });
    if (!agreements.age || !agreements.terms || !agreements.privacy) {
      alert('필수 약관에 동의해야 회원가입이 가능합니다.');
      return;
    }
      setSuccess(alert('회원가입이 완료되었습니다!'));
      navigate('/login');
    }catch(err){
      setError('회원가입 실패: 아이디가 이미 존재하거나 서버오류입니다.');
    };
  };

  return (
    <div className="join-container">
      <h2 className="join-title">회원가입</h2>

      <form className="join-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" id="userid" name="userid" value={form.userid}
          onChange={handleChange}
          required />
          <label htmlFor="userid">아이디</label>
        </div>

        <div className="input-group">
          <input type="password" id="password" value={form.password} name="password"
          onChange={handleChange}
          required />
          <label htmlFor="password">비밀번호</label>
        </div>

        <div className="input-group">
          <input type="password" id="password2" value={form.password2} name="password2"
          onChange={handleChange}
          required />
          <label htmlFor="password2">비밀번호 확인</label>
        </div>

        <div className="input-group">
          <input type="text" id="nickname" name="nickname" value={form.nickname}
          onChange={handleChange}
          required />
          <label htmlFor="nickname">닉네임</label>
        </div>

        <div className="input-group">
          <input type="email" id="email" name="email" value={form.email}
          onChange={handleChange}
          required />
          <label htmlFor="email">이메일</label>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={agreements.all}
              onChange={handleAllAgreement}
            /> 모두 동의합니다.
          </label>

          <label>
            <input
              type="checkbox"
              checked={agreements.age}
              onChange={() => handleAgreementChange('age')}
            /> [필수] 만 14세 이상입니다.
          </label>

          <label>
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => handleAgreementChange('terms')}
            /> [필수] 이용약관 동의
            <button type="button" onClick={() =>
              handleOpenModal(
                <div className="modal-text">
                  <p><strong>[제1조] 목적</strong><br />이 약관은 회사(이하 "회사")가 제공하는 모든 서비스(웹사이트 및 앱 포함)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                  <p><strong>[제2조] 회원가입</strong><br />회원은 실명과 정확한 정보를 바탕으로 가입해야 하며, 허위정보 또는 타인 명의로 가입한 경우 서비스 이용이 제한될 수 있습니다.</p>
                  <p><strong>[제3조] 서비스 이용</strong><br />회원은 회사가 제공하는 서비스를 본 약관 및 관계 법령에 따라 이용해야 하며, 아래 행위를 해서는 안 됩니다.<br />- 타인 개인정보 도용 또는 무단 수집<br />- 욕설, 도배, 명예훼손, 음란물 게시<br />- 서비스의 정상 운영을 방해하는 자동화 프로그램 사용 등</p>
                  <p><strong>[제4조] 게시물의 권리와 책임</strong><br />회원이 서비스 내에 게시한 콘텐츠에 대한 저작권은 회원에게 있으며, 회사는 서비스 운영, 홍보 목적 등 정당한 목적 하에 이를 사용할 수 있습니다. 단, 불법 또는 부적절한 콘텐츠는 사전 통보 없이 삭제될 수 있습니다.</p>
                  <p><strong>[제5조] 서비스 제공 및 중단</strong><br />회사는 시스템 점검, 보수, 서비스 개선, 또는 불가항력적인 사유로 인해 서비스 제공을 일시적으로 중단할 수 있습니다. 이 경우 사전 또는 사후에 공지합니다.</p>
                  <p><strong>[제6조] 이용제한 및 해지</strong><br />회원이 본 약관을 위반하거나 서비스의 질서를 해치는 행위를 한 경우, 회사는 이용 제한, 계정 정지 또는 삭제 등의 조치를 취할 수 있습니다.</p>
                  <p><strong>[제7조] 약관의 변경</strong><br />본 약관은 관련 법령 또는 회사의 정책 변경에 따라 개정될 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 사전 고지됩니다.</p>
                </div>
              )
            }>내용보기</button>
          </label>

          <label>
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => handleAgreementChange('privacy')}
            /> [필수] 개인정보 수집 및 이용 동의
            <button type="button" onClick={() =>
              handleOpenModal(
                <div className="modal-text">
                  <p><strong>[제1조] 수집 항목</strong><br />아이디, 비밀번호, 닉네임, 신발 사이즈 등 기본적인 회원 정보를 수집합니다.</p>
                  <p><strong>[제2조] 수집 목적</strong><br />회원 식별, 서비스 제공, 고객 응대, 민원 처리 및 부정이용 방지 등의 목적으로 사용됩니다.</p>
                  <p><strong>[제3조] 보유 기간</strong><br />회원 탈퇴 시까지 보관되며, 관련 법령에 따라 일정 기간 보존될 수 있습니다.</p>
                  <p><strong>[제4조] 거부 권리 및 불이익</strong><br />회원은 개인정보 제공을 거부할 수 있으며, 이 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.</p>
                </div>
              )
            }>내용보기</button>
          </label>

          <label>
            <input
              type="checkbox"
              checked={agreements.marketing}
              onChange={() => handleAgreementChange('marketing')}
            /> [선택] 마케팅 목적 활용 및 광고성 정보 수신 동의
            <button type="button" onClick={() =>
              handleOpenModal(
                <div className="modal-text">
                  <p><strong>[제1조] 수집 및 활용 항목</strong><br />이메일, 접속 기록, 관심 카테고리 등</p>
                  <p><strong>[제2조] 활용 목적</strong><br />이벤트 안내, 신규 서비스 소개, 맞춤형 광고 제공 등 마케팅 목적</p>
                  <p><strong>[제3조] 수신 방법</strong><br />이메일, 문자 메시지, 앱 푸시 등을 통해 발송됩니다.</p>
                  <p><strong>[제4조] 철회 방법</strong><br />회원은 언제든지 수신 동의를 철회할 수 있으며, 철회 이후에도 서비스 이용에는 제한이 없습니다.</p>
                </div>
              )
            }>내용보기</button>
          </label>
        </div>

        <button type="submit" className="join-btn">회원가입</button>
        {error&&<p style={{color:'red'}}>{error}</p>}
        {success&&<p style={{color:'green'}}>{success}</p>}
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>×</button>
            <div className="modal-scroll-area">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Join;
