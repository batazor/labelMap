import path from 'path'
import express from 'express'
import serialize from 'serialize-javascript'

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { app as configApp } from './config'
import { configureStore } from './store'
import routes from './routes'

const app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: "/",
  stats: {
    colors: true
  }
}))

const HTML = ({ content, store }) => (
  <html>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      <div id="devtools" />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script src="/bundle.js" />
    </body>
  </html>
)

app.use(function (req, res) {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={ store }>
          <RouterContext {...renderProps} />
        </Provider>
      )

      res.send('<!doctype html>\n' + renderToString(<HTML content={ content } store={ store } />))
    }
  })
})

app.listen(configApp.PORT, (err, result) => {
  if (err) {
    return console.error(err);
  }

  console.log(` ✔ Server API listening on http://localhost:${ configApp.PORT }, Ctrl+C to stop`);
})

if (configApp.ENV) {

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  }).listen(configApp.PORT_DEV, 'localhost', function (err, result) {
    if (err) {
      return console.error(err);
    }

    console.log(` ✔ WebpackDevServer listening on http://localhost:${ configApp.PORT_DEV }`);
    console.log('\nBundling project, please wait...');
  });
}
