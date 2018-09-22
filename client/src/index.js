import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <HashRouter>
      <Switch>
        <Route exact path="/" render={(props) => {
        return <Login {...props} /> }}/>
        <Route exact path="/login" render={(props) => {
        return <Login {...props} /> }}/>
      </Switch>
    </HashRouter>, document.getElementById('root'));
registerServiceWorker();
