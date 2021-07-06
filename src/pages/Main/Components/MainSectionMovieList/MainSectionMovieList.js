import React from 'react';
import './MainSectionMovieList.scss';
import { withRouter } from 'react-router-dom';

class MainSectionMovieList extends React.Component {
  goToDetailPage = () => {
    const id = this.props.id;
    this.props.history.push(`/detail/${id}`);
  };
  render() {
    const {
      title,
      country,
      releaseDate,
      thumbnailImgUrl,
      width,
      netflix,
      watcha,
      movieListRanking,
    } = this.props;
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
        <img alt="test" src={thumbnailImgUrl} />
        <div className="listDescription">
          <p className="listDescriptionTitle">{title}</p>
          <p className="listDescriptionYear">
            {country} ・ {releaseDate.slice(0, 4)}
          </p>
        </div>
      </li>
    );
  }
}
export default withRouter(MainSectionMovieList);
