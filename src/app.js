import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { configureStore, DevTools } from './store'
import routes from './routes'

// import './style/flexboxgrid.css'

const store = configureStore(browserHistory, window.__initialState__)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={ store } >
    <Router history={ history } routes={ routes } />
  </Provider>,
  document.getElementById('app')
)

ReactDOM.render(
  <Provider store={ store }>
    <DevTools/>
  </Provider>,
  document.getElementById('devtools')
)
