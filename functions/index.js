const functions = require("firebase-functions");
const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors({origin: true}))

app.get('/scrape', (req, res) => {
  // scraper(res)
  res.send('Hello World: part 1')
})

exports.api = functions
  // .runWith({memory: '1GB'})
  .https.onRequest((request, response) => {
    return app(request, response)
  })
