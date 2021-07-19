import React from 'react';
import ReactDOM from 'react-dom';
import Routes from 'Routes.js';
import axios from 'axios';

import 'styles/common.scss';
import 'styles/reset.scss';

axios.defaults.baseURL = 'https://api.youngchapedia.com';
axios.defaults.withCredentials = true;

ReactDOM.render(<Routes />, document.getElementById('root'));
