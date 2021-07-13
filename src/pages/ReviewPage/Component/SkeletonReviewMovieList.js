import React, { Component } from 'react';
import './SkeletonReviewMovieList.scss';
import './ReviewMovieList.scss';

export default class SkeletonReviewMovieList extends Component {
  render() {
    return (
      <li className="reviewMovieList">
        <div className="skeletonReviewPoster" />
        <div className="skeletonMovieInfos">
          <div>
            <div className="skeletonTitle" />
            <div className="skeletonYearCountry" />
          </div>
          <div className="skeletonStarContainer">
            <div className="defaultStar" />
            <div className="defaultStar" />
            <div className="defaultStar" />
            <div className="defaultStar" />
            <div className="defaultStar" />
          </div>
        </div>
      </li>
    );
  }
}
