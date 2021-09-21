const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const corsConfig = {
    methods: ['GET'],
    origin: true
}

// Load routes
const cheerioRoutes = require('./app-cheerio/routes.js')
const puppeteerRoutes = require('./app-puppeteer/routes.js')

// Setup Express apps
const cheerioApp = express()
    .use(cors(corsConfig))
    .use('/', cheerioRoutes)

const puppeteerApp = express()
    .use(cors(corsConfig))
    .use('/', puppeteerRoutes)

// Return Cheerio app from '/api'
exports.api = functions
    .https.onRequest((request, response) => {
        return cheerioApp(request, response)
    })

// Return Puppeteer app from '/api'
exports.browser = functions
    .runWith({ memory: '1GB' }) // Use when we start running Puppeteer
    .https.onRequest((request, response) => {
        return puppeteerApp(request, response)
    })
