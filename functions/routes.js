const express = require('express');
const router = express.Router();

// Import Cheerio based controllers
const pageController = require('./controllers/pageController');
const pageTablesController = require('./controllers/pageTablesController');
const pageFormsController = require('./controllers/pageFormsController');

// Import Puppeteer based controllers
const pageScreenshotController = require('./controllers/pageScreenshotController');

// Add routes to router
router.get('/page', pageController.get);
router.get('/tables', pageTablesController.get);
router.get('/forms', pageFormsController.get);
router.get('/screenshot', pageScreenshotController.get);

module.exports = router
