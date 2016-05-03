"use strict"

import path from 'path'
import express from 'express'

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack.config'

import { app as configApp } from '../config'

let app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/template.html'));
})

app.listen(configApp.APP_PORT, (err, result) => {
  if (err) {
    return console.error(err);
  }

  console.log(` ✔ Server API listening on http://localhost:${ configApp.APP_PORT }, Ctrl+C to stop`);
});

if (configApp.APP_ENV) {

  new WebpackDevServer(webpack(webpackConfig))
    .listen(configApp.APP_DEV, 'localhost', function (err, result) {
      if (err) {
        return console.error(err);
      }

      console.log(` ✔ WebpackDevServer listening on http://localhost:${ configApp.APP_DEV }, Ctrl+C to stop`);
    });
}
