import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import MainSection from './Components/MainSection/MainSection';
import API_URLS from 'config';
import './Main.scss';

const MOCK_DATA = axios.create({
  baseURL: '',
});

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      movieInformationList: [],
      preItems: 0,
      items: 1,
    };
  }

  getMovieListData = address => {
    return axios
      .get(address)
      .then(res => res.data)
      .then(movieList => {
        this.setState({
          movieInformationList: [
            ...this.state.movieInformationList,
            movieList.MESSAGE[0],
          ],
        });
      });
  };

  infiniteScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const { preItems, items } = this.state;

    if (scrollTop >= scrollHeight - clientHeight) {
      this.setState({
        preItems: preItems + 1,
        items: items + 1,
      });

      MOCK_DATA.get('/data/movieMockData.json')
        .then(res => res.data)
        .then(movieArrays => {
          const movieArray = movieArrays.slice(preItems + 1, items + 1);
          this.setState({
            movieInformationList: [
              ...this.state.movieInformationList,
              ...movieArray,
            ],
          });
        });
    }
  };

  componentDidMount() {
    this.getMovieListData(API_URLS['MAIN_BOX_OFFICE'])
      .then(() => this.getMovieListData(API_URLS['MAIN_NETFLIX']))
      .then(() => this.getMovieListData(API_URLS['MAIN_YOUNGCHA']));
    window.addEventListener('scroll', this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  render() {
    return (
      <>
        {this.state.movieInformationList && (
          <section className="main">
            {this.state.movieInformationList.map((listElement, movieTitle) => {
              return (
                <MainSection
                  goToDetailPage={this.goToDetailPage}
                  movieInformationList={listElement}
                  movieTitle={movieTitle}
                />
              );
            })}
          </section>
        )}
      </>
    );
  }
}
export default withRouter(Main);
