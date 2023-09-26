const express = require('express');
const router = express.Router();

// Import controllers
// const pageScrapeController = require('./controllers/pageScrapeController');
const screenshotController = require('./controllers/screenshotController');

// Add routes to router
// router.get('/page', pageScrapeController.get);
router.get('/', screenshotController.get);

module.exports = router
