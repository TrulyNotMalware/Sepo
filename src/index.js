import React from 'react';
import ReactDOM from 'react-dom';
import { history } from 'history';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Nrouter from './Components/Router';

ReactDOM.render(
    <Nrouter />,
    document.getElementById('root')
);
/*
ReactDOM.render(<Router>
        <Route path = "/" component = {App}>
        </Route>
    </Router>, document.getElementById('root')

);
*/
serviceWorker.unregister();
