import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import API_URLS from '../../config';
import ModalLogoLayout from '../CommonComponents/ModalLogoLayout';
import './LoginSignUpForm.scss';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

class LoginSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pw: '',
      name: '',
      isOnceBlured: false,
    };
  }

  //https://slog.website/post/10

  onSilentRefresh = () => {
    const loginData = {
      email: this.state.id,
      password: this.state.pw,
    };

    axios
      .post('/silent-refresh', loginData)
      .then(this.onLoginSuccess)
      .catch(error => {
        // ... 로그인 실패 처리
        console.log(error);
        alert('로그인에 실패했습니다');
      });
  };
  //

  onLoginSuccess = res => {
    const { accessToken } = res.data;

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    // accessToken을 localStorage, cookie 등에 저장하지 않는다!
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(this.onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  };

  requestLogin = e => {
    e.preventDefault();
    const loginData = {
      email: this.state.id,
      password: this.state.pw,
    };

    const loginResult = axios
      .post(API_URLS.LOGIN, loginData, {
        validateStatus: status => {
          return status < 500;
        },
      })
      .then(this.onLoginSuccess)
      .catch(error => alert(error));

    switch (loginResult.status) {
      case 200:
        alert('환영합니다');
        // localStorage.setItem('TOKEN', loginResult.data.token);
        // this.props.checkUserLogined();
        this.props.history.push('/review');
        break;

      case 400:
        alert('정보를 모두 입력해주세요');
        break;

      case 401:
        alert('올바른 아이디 또는 비밀번호인지 확인해주세요');
        break;

      default:
        alert('알 수 없는 에러가 발생했습니다');
    }
  };

  requestSignUp = async e => {
    e.preventDefault();
    const signUpResult = await axios.post(
      API_URLS.SIGNUP,
      {
        name: this.state.name,
        email: this.state.id,
        password: this.state.pw,
      },
      {
        validateStatus: status => {
          return status < 500;
        },
      }
    );

    switch (signUpResult.status) {
      case 201:
        alert('회원가입 성공');
        this.props.closeModal();
        break;

      case 400:
        alert('정보를 모두 입력해주세요');
        break;

      case 401:
        alert('올바른 형식의 정보인지 확인해주세요');
        break;

      default:
        alert('알 수 없는 에러가 발생했습니다');
        console.log(signUpResult.error);
    }
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDeleteBtn = e => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.previousSibling.name]: '',
    });
  };

  checkIdValid = () => {
    const { id } = this.state;
    if (id) {
      const checkIdCondition =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return checkIdCondition.test(id);
    }
  };

  checkPwValid = () => {
    const { pw } = this.state;
    if (pw) {
      const checkChars = /(?=.*[A-Za-z])/;
      const checkNums = /(?=.*\d)/;
      const checkMarks = /(?=.*[$@$!%*#?&])/;
      const checkCounts = /^[A-Za-z\d$@$!%*#?&]{10,}$/;
      return (
        checkCounts.test(pw) &&
        [checkChars.test(pw), checkNums.test(pw), checkMarks.test(pw)].filter(
          Boolean
        ).length >= 2
      );
    }
  };

  checkNameValid = () => {
    const { name } = this.state;
    if (name) {
      return name.length > 1;
    }
  };

  handleBlur = () => {
    this.setState({
      isOnceBlured: true,
    });
  };

  render() {
    const { id, pw, name, isOnceBlured } = this.state;
    const { switchLoginSignUpForm, formType } = this.props;
    const {
      handleInput,
      requestLogin,
      requestSignUp,
      handleDeleteBtn,
      checkIdValid,
      checkPwValid,
      checkNameValid,
    } = this;

    const isIdValid = isOnceBlured ? checkIdValid() : undefined;
    const isPwValid = isOnceBlured ? checkPwValid() : undefined;
    const isNameValid = isOnceBlured ? checkNameValid() : undefined;
    const isIdPwBothValid = isIdValid && isPwValid;
    const isInfoAllValid = isIdValid && isPwValid && isNameValid;

    return (
      <ModalLogoLayout>
        <h2 className="formHeader">
          {formType === 'signUp' ? '회원가입' : '로그인'}
        </h2>
        <form className="form">
          {formType === 'signUp' && (
            <div
              className={`inputDiv ${
                isNameValid === false && 'warningInputDiv'
              }`}
            >
              <label
                className={`inputLabel ${
                  isNameValid === false && 'warningLabel'
                }`}
              >
                <input
                  placeholder="이름"
                  type="text"
                  name="name"
                  className={isNameValid === false && 'warningInput'}
                  onChange={handleInput}
                  value={name}
                />
                {isNameValid === false && (
                  <>
                    <button className="deleteBtn" onClick={handleDeleteBtn}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <span className="warningIcon">!</span>
                  </>
                )}
              </label>
              {isNameValid === false && (
                <p className="warningText">정확하지 않은 이름입니다.</p>
              )}
            </div>
          )}
          <div
            className={`inputDiv ${isIdValid === false && 'warningInputDiv'}`}
          >
            <label
              className={`inputLabel ${isIdValid === false && 'warningLabel'}`}
            >
              <input
                placeholder="이메일"
                type="text"
                name="id"
                className={isIdValid === false && 'warningInput'}
                onChange={handleInput}
                onBlur={this.handleBlur}
                value={id}
              />
              {isIdValid === false && (
                <>
                  <button className="deleteBtn" onClick={handleDeleteBtn}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <span className="warningIcon">!</span>
                </>
              )}
            </label>
            {isIdValid === false && (
              <p className="warningText">정확하지 않은 이메일입니다.</p>
            )}
          </div>
          <div
            className={`inputDiv ${isPwValid === false && 'warningInputDiv'}`}
          >
            <label
              className={`inputLabel ${isPwValid === false && 'warningLabel'}`}
            >
              <input
                placeholder="비밀번호"
                type="password"
                name="pw"
                className={isPwValid === false && 'warningInput'}
                onChange={handleInput}
                value={pw}
              />
              {isPwValid === false && (
                <>
                  <button className="deleteBtn" onClick={handleDeleteBtn}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <span className="warningIcon">!</span>
                </>
              )}
            </label>
            {isPwValid === false && (
              <p className="warningText">
                비밀번호는 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소
                10자리 이상이어야 합니다.
              </p>
            )}
          </div>
          {formType === 'signUp' ? (
            <button
              className="loginSignUpBtn"
              disabled={!isInfoAllValid}
              onClick={requestSignUp}
            >
              회원가입
            </button>
          ) : (
            <button
              className="loginSignUpBtn"
              disabled={!isIdPwBothValid}
              onClick={requestLogin}
            >
              로그인
            </button>
          )}
        </form>
        {formType === 'login' && (
          <p className="lostPassword">비밀번호를 잊어버리셨나요?</p>
        )}
        {formType === 'signUp' ? (
          <p className="suggestSignUp suggestLogin">
            이미 가입하셨나요?
            <button
              className="loginSignUpLink"
              name="login"
              onClick={switchLoginSignUpForm}
            >
              로그인
            </button>
          </p>
        ) : (
          <p className="suggestSignUp">
            계정이 없으신가요?
            <button
              className="loginSignUpLink"
              name="signUp"
              onClick={switchLoginSignUpForm}
            >
              회원가입
            </button>
          </p>
        )}
      </ModalLogoLayout>
    );
  }
}

export default withRouter(LoginSignUpForm);
