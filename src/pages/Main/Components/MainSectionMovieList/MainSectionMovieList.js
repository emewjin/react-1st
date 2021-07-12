import React from 'react';
import { withRouter } from 'react-router-dom';
import './MainSectionMovieList.scss';

class MainSectionMovieList extends React.Component {
  goToDetailPage = () => {
    const id = this.props.id;
    this.props.history.push(`/detail/${id}`);
  };
  render() {
    const { width, movieListRanking } = this.props;
    const {
      korean_title,
      country,
      release_date,
      thumbnail_img,
      netflix,
      watcha,
    } = this.props.movieData;

    return (
      <li
        onClick={this.goToDetailPage}
        style={{
          transform: `translateX(-${width}px)`,
          transition: 'transform .8s ',
        }}
        className="mainSectionMovieList"
      >
        <div
          className={
            (netflix && 'listNetflixicon') || (watcha && 'listWatchaicon')
          }
        ></div>
        <div className="listRanking">{movieListRanking + 1}</div>
        <img className="movieListPoster" alt="test" src={thumbnail_img} />
        <div className="listDescription">
          <p className="listDescriptionTitle">{korean_title}</p>
          <p className="listDescriptionYear">
            {country} ・ {release_date.slice(0, 4)}
          </p>
        </div>
      </li>
    );
  }
}
export default withRouter(MainSectionMovieList);
