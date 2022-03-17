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

// Return Cheerio app from '[host]/api/cheerio'
exports.cheerio = functions
    .https.onRequest((request, response) => {
        return cheerioApp(request, response)
    })

// Return Puppeteer app from '[host]/api/puppeteer'
exports.puppeteer = functions
    .runWith({ memory: '1GB' }) // Give Puppeteer more resources
    .https.onRequest((request, response) => {
        return puppeteerApp(request, response)
    })
