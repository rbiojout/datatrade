import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import dataTradeApp from "./reducers";

// Containers
import { DefaultLayout } from './containers';
// Pages
// import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
let store = createStore(dataTradeApp, composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));
/* eslint-enable */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            {/* <Route path="/h" name="Home" component={DefaultLayout} /> */}
            <Route path='/' render={routeProps => <DefaultLayout {...routeProps} isRestricted={true} />} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}


export default App;
