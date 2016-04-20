"use strict"

import path from 'path'
import express from 'express'
import { app as configApp } from '../config'

let app = express()

app.set('view', path.resolve(__dirname, './view'))
app.set('view engine', 'jade')

app.use(express.static(path.resolve(__dirname, '../bundle')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/template.html'));
})

app.listen(configApp.APP_PORT, () => {
  console.log(`Server run on port ${ configApp.APP_PORT }`);
});
