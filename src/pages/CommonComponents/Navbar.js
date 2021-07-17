import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import LoginSignUpForm from 'pages/LoginSignUp/LoginSignUpForm';
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogined: !!localStorage.getItem('TOKEN'),
      formType: '',
      modalOpened: false,
    };
  }

  checkUserLogined = () => {
    if (localStorage.getItem('TOKEN')) {
      this.setState({
        isUserLogined: true,
      });
    }
  };

  closeModal = () => {
    this.setState({
      modalOpened: false,
    });
  };

  openLoginSignUpForm = e => {
    this.setState({
      modalOpened: true,
      formType: e.target.name,
    });
  };

  switchLoginSignUpForm = e => {
    this.setState({
      formType: e.target.name,
    });
  };

  logout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('NAME');
    this.setState({
      isUserLogined: false,
    });
    this.props.history.push('/');
  };

  render() {
    const { isUserLogined, modalOpened, formType } = this.state;
    const {
      closeModal,
      openLoginSignUpForm,
      logout,
      checkUserLogined,
      switchLoginSignUpForm,
    } = this;
    const logoutedBtn = (
      <>
        <button
          className="navLoginBtn"
          name="login"
          onClick={openLoginSignUpForm}
        >
          로그인
        </button>
        <button
          className="navSignUpBtn"
          name="signUp"
          onClick={openLoginSignUpForm}
        >
          회원가입
        </button>
      </>
    );
    const loginedBtn = (
      <>
        <button className="navLogoutBtn">
          <Link to="/review">평가하기</Link>
        </button>
        <button className="navLogoutBtn" onClick={logout}>
          로그아웃
        </button>
        <button>
          <Link to="/mypage">
            <div className="navUserProfile" />
          </Link>
        </button>
      </>
    );

    return (
      <>
        {modalOpened && (
          <Modal
            closeModal={closeModal}
            childComponent={
              <LoginSignUpForm
                closeModal={closeModal}
                formType={formType}
                checkUserLogined={checkUserLogined}
                switchLoginSignUpForm={switchLoginSignUpForm}
              />
            }
          />
        )}
        <nav className="topNav">
          <span className="logoMenu">
            <header>
              <Link to="/">
                <h1>
                  <span>YOUNGCHA</span>
                  <span>PEDIA</span>
                </h1>
              </Link>
            </header>
            <ul className="navMenu">
              <li>영화</li>
            </ul>
          </span>
          <span className="searchUser">
            <label className="navSearch" htmlFor="searchInput">
              <FontAwesomeIcon icon={faSearch} className="topNavIcon" />
              <input
                id="searchInput"
                placeholder="작품 제목, 배우, 감독을 검색해보세요"
              />
            </label>
            {isUserLogined ? loginedBtn : logoutedBtn}
          </span>
        </nav>
      </>
    );
  }
}

export default withRouter(Navbar);
