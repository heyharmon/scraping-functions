const express = require('express');
const router = express.Router();

// Import controllers
const pageScreenshotController = require('./controllers/pageScreenshotController');

// Add routes to router
router.get('/screenshot', pageScreenshotController.get);

module.exports = router
