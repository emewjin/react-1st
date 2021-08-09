# 🍿 Team Youngchapedia
🚀 [https://youngchapedia.com/](https://youngchapedia.com/)

## 🎞 프로젝트 소개

> 왓챠피디아의 기획과 디자인을 참고하여 초기세팅부터 끝까지 직접 만든 웹 개발 프로젝트  
> 영화를 좋아하는 사람들이 자신의 감상을 기반으로 영화를 평가하고, 그에 대한 결과를 조회하고, 영화에 대한 정보를 얻고, 자유롭게 감상을 나누는 영화 콘텐츠 커뮤니티입니다.

- 프로젝트 기간 : 2021.05.10 ~ 2021.05.21

## 🎯 프로젝트 목표
 1. 백엔드-프론트엔드 커뮤니케이션 및 통신으로 협업 경험 쌓기
 2. 기능 구현 계획별 시간 관리 경험 쌓기
 3. React Class Component를 사용한 컴포넌트 관리 및 구조 설계
 4. 라이브러리를 사용하지 않고 최대한 구현해보는 경험 쌓기
 5. SSS를 활용한 스타일링

## 팀원 구성 및 블로그

- Front-End: [전용민(PM)](https://velog.io/@dydalsdl1414), [임유진](https://velog.io/@1703979), [이다슬](https://velog.io/@_seeul)
- Back-End: 김하민, 최대환 ([백엔드 깃허브](https://github.com/wecode-bootcamp-korea/20-1st-YOUNGCHAPEDIA-backend))

## 기획 포인트

- 개인의 취향을 존중하는 **영화 리뷰** 커뮤니티
- 내가 모르는 나의 취향을 추천받기 위한 영화 **평가하기**
- 평가한 별점으로 사용자의 **선호 장르 파악** 별점 추이 **그래프화**
- 장르별 영화 **필터링**
- 시간이 지날수록 더 많아지는 영화들의 **정보** 관리

## 데모 영상

- YouTube : [Link](https://www.youtube.com/watch?v=hDn8vX0VyUc)

## 🎞 적용 기술 및 구현 기능

### 적용 기술

- Front-End : React, React Router, Sass, JavaScript, CRA
- Back-End : Python, Django, My SQL
- Communication Tool : Trello, Git, GitHub, Slack

### 구현 기능

- 메인 페이지
- 상세 페이지 (영화별)
- 로그인 & 회원가입 모달
- 평가하기 페이지
- 마이페이지
- 취향분석 페이지

### 👩🏻‍🌾 제가 담당한 구현 사항이예요

#### 감상한 영화를 평가할 수 있어요

1.  백엔드 API로부터 유저가 아직 평가하지 않은 영화 정보를 받아 보여줌
2.  많은 영화가 그려지기 때문에 무한스크롤을 이용해 사용자 경험 개선, throttle로 스크롤 이벤트 최적화
3.  Star Rating 컴포넌트를 구현하여 0.5점 단위로 별점을 평가하고 서버로 POST
5.  별점 POST 완료시 바로 내가 평가한 영화 개수 업데이트
6.  쿼리파라미터를 활용해 장르 메뉴 (모달)에서 클릭한 장르에 해당하는 영화 get 요청


#### 마이페이지에서 취향분석 결과를 제공해요
- fetch API를 이용해 백엔드 API로부터 유저가 평가한 영화 정보를 받아 별점 분포 그래프, 선호 장르 랭킹 분석 결과지 그리기

#### 로그인/회원가입

1. 처음엔 JWT, 로컬 스토리지를 이용해 로그인 상태 유지 및 로그인/회원가입/로그아웃을 구현
2. 부트캠프 수료 후 안전한 로그인에 대해 백엔드 담당자와 함께 고민, 공부. [📎 관련 글은 여기서 보실 수 있어요](https://emewjin.github.io/study/studyLogin)
3. https 환경으로 배포하여 http-only 설정된 쿠키로 리프레쉬 토큰을 관리하고자 수정 **진행 중 🔧**
4. 정규표현식을 활용해 이름/이메일/비밀번호 유효성 검사
5. 로그인 여부에 따라 Nav UI 조건부 렌더링

#### 기타사항
- 기타 자잘한 공용 컴포넌트 구현 : modal, footer, nav
- AWS S3, Cloudfront, Route 53을 이용한 https 배포. [📎 관련 글은 여기서 보실 수 있어요](https://emewjin.github.io/study/httpsDeploy)

## 📝 프로젝트 회고록

- [전용민](https://velog.io/@dydalsdl1414/WECODE-1%EC%B0%A8-%ED%81%B4%EB%A1%A0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)
- [임유진](https://velog.io/@1703979/YPP-1)
- [이다슬](https://velog.io/@_seeul/Project-1%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%98%81%EC%B0%A8%ED%94%BC%EB%94%94%EC%95%84-%ED%9A%8C%EA%B3%A0%EB%A1%9D)

## 📢 Reference

- 이 프로젝트는 [왓챠피디아 사이트](https://pedia.watcha.com/ko-KR)를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진과 영화 정보 대부분은 영화 소개의 목적으로 영화 제작사에서 제공한 자료를 사용했습니다.
- 이 프로젝트에서의 영화별 장르는 임의로 설정한 것이며 실제와 무관합니다.
