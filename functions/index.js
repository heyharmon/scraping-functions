const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')

// Import routes
const routes = require('./routes.js');

// Setup Express app
const app = express()
      app.use(cors({origin: true}))
      app.use('/', routes);

// Return Express app from Firebase Function on "/api"
exports.api = functions
    // .runWith({memory: '1GB'}) // Use when we start running Puppeteer
    .https.onRequest((request, response) => {
        return app(request, response)
    })
