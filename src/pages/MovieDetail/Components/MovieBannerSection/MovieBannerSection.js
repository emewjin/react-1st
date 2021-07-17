import React from 'react';
import StarRating from 'pages/CommonComponents/StarRating';
import Grade from 'grade-js';
import './MovieBannerSection.scss';

export default class MovieBannerSection extends React.Component {
  componentDidMount() {
    window.addEventListener('load', function () {
      Grade(document.querySelectorAll('.gradient-wrap'));
    });
  }
  render() {
    const { movieInformation } = this.props;
    return (
      <section className="MovieBannerSection">
        <div className="movieBannerPoster">
          <div className="gradient-wrap">
            <img
              alt="stillCut"
              src="/images/lala.jpg"
              // src={movieInformation[0]?.['background_img']}
              className="stillCut"
              cross-origin="anonymous"
            />
          </div>
        </div>
        <div className="movieSimpleInformation">
          <div className="movieSimpleInformationContents">
            <img alt="poster" src={movieInformation[0]?.['thumbnail_img']} />
            <div className="movieSubject">
              <h1>{movieInformation[0]?.['korean_title']}</h1>
              <div className="movieGenre">
                {movieInformation[0]?.['running_time']} 분 &middot;
                {movieInformation[0]?.genre[0]?.name}
                &middot; {movieInformation[0]?.country}
              </div>
              <div className="wishAndStarPoint">
                <button
                  className={
                    this.props.userWishStatus.userWish
                      ? 'wishButton active'
                      : 'wishButton'
                  }
                  onClick={this.props.userWishStatusHandler}
                >
                  <i
                    className={
                      this.props.userWishStatus.userWish
                        ? 'far fa-bookmark'
                        : 'fas fa-plus'
                    }
                  ></i>
                  보고싶어요
                </button>
                <div className="giveStarPoint">
                  <div className="detailStarRatingTitle">평가하기</div>
                  <div>
                    {this.props.starRatingForDetail !== null && (
                      <StarRating
                        postStar={this.props.postStar}
                        starRatingForDetail={this.props.starRatingForDetail}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
