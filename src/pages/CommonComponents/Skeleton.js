import React, { Component } from 'react';
import '../Main/Components/MainSectionMovieList/MainSectionMovieList.scss';
import './Skeleton.scss';

export default class Skeleton extends Component {
  render() {
    return (
      <li className="skeletonList">
        <div className="skeletonPoster" />
        <div className="skeletonDescription">
          <p className="skeletonDescriptionTitle"></p>
          <p className="skeletonDescriptionYear"></p>
        </div>
      </li>
    );
  }
}
