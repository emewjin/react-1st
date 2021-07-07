import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import LoginSignUpForm from '../LoginSignUp/LoginSignUpForm';
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

  clickSignUp = () => {
    this.setState({
      modalOpened: true,
      formType: 'signUp',
    });
  };

  clickLogin = () => {
    this.setState({
      modalOpened: true,
      formType: 'login',
    });
  };

  clickLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('NAME');
    this.setState({
      isUserLogined: false,
    });
    this.props.history.push('/');
  };

  goToLoginModal = () => {
    this.setState({
      formType: 'login',
    });
  };

  goToSignUpModal = () => {
    this.setState({
      formType: 'signUp',
    });
  };

  render() {
    const { isUserLogined, modalOpened, formType } = this.state;
    const {
      closeModal,
      clickSignUp,
      clickLogin,
      clickLogout,
      checkUserLogined,
      goToLoginModal,
      goToSignUpModal,
    } = this;
    const logoutedBtn = (
      <>
        <button className="navLoginBtn" name="login" onClick={clickLogin}>
          로그인
        </button>
        <button className="navSignUpBtn" name="signUp" onClick={clickSignUp}>
          회원가입
        </button>
      </>
    );
    const loginedBtn = (
      <>
        <button className="navLogoutBtn">
          <Link to="/review">평가하기</Link>
        </button>
        <button className="navLogoutBtn" onClick={clickLogout}>
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
                goToLoginModal={goToLoginModal}
                goToSignUpModal={goToSignUpModal}
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
