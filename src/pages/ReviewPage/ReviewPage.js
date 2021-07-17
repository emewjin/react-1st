import React, { Component, createRef } from 'react';
import { throttle } from 'utils/throttle';
import ReviewMovieList from './Component/ReviewMovieList';
import FilterGenreMenu from './Component/FilterGenreMenu';
import Modal from 'pages/CommonComponents/Modal';
import SkeletonReviewMovieList from './Component/SkeletonReviewMovieList';
import API_URLS from 'config';
import './ReviewPage.scss';

export default class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      randomMovie: [],
      genreMovie: [],
      ratingsCount: 0,
      modalOpened: false,
      isLoading: true,
    };
    this.scrollBoxRef = createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
    this.getMovieData();
    this.updateRatingCount();
    this.scrollBoxRef.current.addEventListener(
      'scroll',
      throttle(this.infiniteScroll)
    );
  }

  getMovieData = id => {
    let token = localStorage.getItem('TOKEN');
    const API = id ? `${API_URLS.REVIEW}?genre_id=${id}` : API_URLS.REVIEW;
    fetch(API, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => {
        if (res.status === 200 && token) {
          return res.json();
        }
      })
      .then(res => {
        const responeKey = id ? 'genre_movie' : 'movie_random';
        const movieKeyName = id ? 'genreMovie' : 'randomMovie';
        const prevMovieData = this.state[movieKeyName];
        const updatedMovieData = res[responeKey].slice(
          prevMovieData.length,
          prevMovieData.length + 7
        );
        this.setState({
          [movieKeyName]: [...prevMovieData, ...updatedMovieData],
          movieData: [...prevMovieData, ...updatedMovieData],
        });
      });
  };

  infiniteScroll = () => {
    const scrollHeight = this.scrollBoxRef.current.scrollHeight;
    const scrollTop = this.scrollBoxRef.current.scrollTop;
    const offsetTop = this.scrollBoxRef.current.offsetTop;
    const clientHeight = this.scrollBoxRef.current.clientHeight;
    if (offsetTop + scrollTop + clientHeight >= scrollHeight)
      this.getMovieData();
  };

  updateRatingCount = () => {
    fetch(API_URLS.REVIEW, {
      headers: {
        Authorization: localStorage.getItem('TOKEN'),
      },
    })
      .then(res => res.json())
      .then(res => {
        const lastIndex = res['movie_random'].length - 1;
        const ratingCountObject = res['movie_random'][lastIndex];
        const updatedRatingsCount = Object.values(ratingCountObject);
        this.setState({
          ratingsCount: updatedRatingsCount,
        });
      })
      .catch(error => alert(error));
  };

  closeModal = () => {
    this.setState({
      modalOpened: false,
    });
  };

  openFilterGenre = () => {
    this.setState({
      modalOpened: true,
    });
  };

  //To Do : 잘 작동하는지 확인 return 값들
  getMessageByCount = countValue => {
    let message;
    Object.keys(MESSAGE).some(ranges => {
      const rangeArr = ranges.split('-');
      const [rangeA, rangeB] = rangeArr;
      if (+countValue >= rangeA && +countValue <= (rangeB || rangeA)) {
        message = MESSAGE[ranges];
      }
      return true;
    });
    return message;
  };

  render() {
    const { movieData, ratingsCount, modalOpened, isLoading } = this.state;
    const {
      getMovieData,
      openFilterGenre,
      updateRatingCount,
      closeModal,
      getMessageByCount,
    } = this;
    return (
      <>
        {modalOpened && (
          <Modal
            closeModal={closeModal}
            childComponent={
              <FilterGenreMenu
                getMovieData={getMovieData}
                closeModal={closeModal}
              />
            }
          />
        )}
        <section className="reviewSection">
          <header className="reviewHeader">
            <h2 className="reviewCount">{ratingsCount}</h2>
            <h3 className="reviewNotice">{getMessageByCount(ratingsCount)}</h3>
            <div className="reviewMenu">
              <ul>
                {CATEGORY_LIST.map(category => (
                  <li className="reviewMenuList" key={category.id}>
                    <button>{category.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reviewCategory">
              <div>
                <button className="reviewCategoryBtn" onClick={openFilterGenre}>
                  🔻영화 카테고리
                </button>
              </div>
            </div>
          </header>
          <div className="reviewList" ref={this.scrollBoxRef}>
            <ul>
              {movieData.map(movie =>
                isLoading ? (
                  <SkeletonReviewMovieList key={movie.movie_id} />
                ) : (
                  <ReviewMovieList
                    key={movie.movie_id}
                    id={movie.movie_id}
                    movieTitle={movie.title}
                    imgSrc={movie.thumbnail}
                    movieReleaseDate={movie['release_date']}
                    movieCountry={movie.country}
                    updateRatingCount={updateRatingCount}
                  />
                )
              )}
            </ul>
          </div>
        </section>
      </>
    );
  }
}

const CATEGORY_LIST = [
  {
    id: 1,
    name: '영화',
  },
  {
    id: 2,
    name: 'TV프로그램',
  },
  {
    id: 3,
    name: '책',
  },
];

const MESSAGE = {
  '0-10': '재미있게 보셨던 영화를 알려주세요',
  '11-30': '아주 조금 알 것 같아요',
  '31-50': '당신의 평가로 추천이 더 정확해지고 있어요!',
  '51-80': '정말 영화를 좋아하시는군요!',
  '81-99': '100개 돌파가 얼마 남지 않았어요!',
  '100-150': '이렇게 많이 영화평을 공유해주셔서 고마워요',
};
