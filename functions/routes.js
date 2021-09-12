const express = require('express');
const router = express.Router();

// Import controllers
const pageController = require('./controllers/pageController');
const pageScreenshotController = require('./controllers/pageScreenshotController');

// Add routes to router
router.get('/page', pageController.get);
router.get('/screenshot', pageScreenshotController.get);

module.exports = router
