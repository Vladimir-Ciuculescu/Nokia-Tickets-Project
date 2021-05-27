import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './index.css';
import App from './App';
import DashBoard from './pages/DashBoardPage/DashBoardPage.jsx'
import reportWebVitals from './reportWebVitals';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import NotFound from './pages/NotFound/NotFound';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/welcome" component={WelcomePage} />
      <Route path = "*" component = {NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
