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
const uploadRoutes = require('./app-upload/routes.js')

// Return Cheerio app from '[host]/api/cheerio'
const cheerioApp = express()
    .use(cors(corsConfig))
    .use('/', cheerioRoutes)

exports.cheerio = functions
    .https.onRequest((request, response) => {
        return cheerioApp(request, response)
    })

// Return Puppeteer app from '[host]/api/puppeteer'
const puppeteerApp = express()
    .use(cors(corsConfig))
    .use('/', puppeteerRoutes)
        
exports.puppeteer = functions
    .runWith({ memory: '1GB' }) // Give Puppeteer more resources
    .https.onRequest((request, response) => {
        return puppeteerApp(request, response)
    })

// Return Upload App from '[host]/api/puppeteer'
const uploadApp = express()
    .use(cors(corsConfig))
    .use('/', uploadRoutes)

exports.upload = functions
    .https.onRequest((request, response) => {
        return uploadApp(request, response)
    })
