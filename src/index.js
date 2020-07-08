import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { history } from 'history';
import './index.css';
import App from './App';
import LoginPage from './Login';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Router>
    <Switch>
        <Route path ="/" exact component = {App} />
        <Route path = "/login" component = {LoginPage} />
    </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//
/*
ReactDOM.render(<Router>
        <Route path = "/" component = {App}>
        </Route>
    </Router>, document.getElementById('root')

);
*/
serviceWorker.unregister();
