import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';

import App from './App';
import Register from './components/Register';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/register" component={Register} />
        </React.Fragment>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
