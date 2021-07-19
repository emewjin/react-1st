import React, { Component } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import StarRating from 'pages/CommonComponents/StarRating';
import API_URLS from 'config';
import './ReviewMovieList.scss';

export default class ReviewMovieList extends Component {
  postStar = starRatingForPost => {
    axios
      .post(API_URLS.REVIEW, {
        movie: this.props.id,
        rating: starRatingForPost,
      })
      .then(this.props.updateRatingCount);
  };

  render() {
    const { movieTitle, imgSrc, movieReleaseDate, movieCountry } = this.props;
    return (
      <li className="reviewMovieList">
        <img alt={`${movieTitle}포스터`} src={imgSrc} />
        <div className="movieInfos">
          <div className="movieInfoColumn">
            <div className="reviewMovieTitle">
              <span>{movieTitle}</span>
              <span className="reviewIcon">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
            </div>
            <div className="movieYearCountry">
              {movieReleaseDate?.slice(0, 4)}·{movieCountry}
            </div>
          </div>
          <div className="movieInfoColumn">
            <StarRating postStar={this.postStar} />
          </div>
        </div>
      </li>
    );
  }
}
