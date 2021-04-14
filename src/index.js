import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as serviceWorker from './serviceWorker';

import Routes from './routes/index';

ReactDOM.render(<Routes/>, document.getElementById('root'));

serviceWorker.unregister();
