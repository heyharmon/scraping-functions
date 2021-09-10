const functions = require("firebase-functions");
const cors = require('cors')
const express = require('express')
const routes = require('./routes/index.js');

const app = express()
      app.use(cors({origin: true}))
      app.use('/', routes);
//
// const app = express()
//       app.use(cors({origin: true}))
//
// app.get('/scrape', (req, res) => {
//     scraper(res)
// })
//
exports.api = functions
    // .runWith({memory: '1GB'})
    .https.onRequest((request, response) => {
        return app(request, response)
    })
