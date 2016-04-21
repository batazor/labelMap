import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import DiffMonitor from 'redux-devtools-diff-monitor'
import SliderMonitor from 'redux-slider-monitor'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

export const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultPosition='bottom'
    defaultSize={0.15}>
    {/*<SliderMonitor keyboardEnabled />*/}
    <LogMonitor
      theme="tomorrow"
      preserveScrollTop={false} />
    <DiffMonitor />
  </DockMonitor>
)

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  let devTools = []
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ]
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  )

  return store
}
