const express = require('express');
const router = express.Router();

// Import controllers
const screenshotController = require('./controllers/screenshotController');

// Add routes to router
router.get('/screenshot', screenshotController.get);

module.exports = router
