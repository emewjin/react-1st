import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import Footer from './pages/CommonComponents/Footer';
import Navbar from './pages/CommonComponents/Navbar';
import ReviewPage from './pages/ReviewPage/ReviewPage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
<<<<<<< HEAD
import MyPage from './pages/MyPage/MyPage';
=======
>>>>>>> master

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/moviedetail" component={MovieDetail}></Route>
          <Route exact path="/review" component={ReviewPage}></Route>
          {/* <Route exact path="/contents" component={}></Route> */}
          {/* <Route exact path="/myPage" component={}></Route> */}
        </Switch>
        {location.pathname !== '/review' && <Footer />}
      </Router>
    );
  }
}
export default Routes;

/* global history */
/* global location */
/* global window */
/* eslint no-restricted-globals: ["off"] */
