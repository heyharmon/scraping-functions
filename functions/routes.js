const express = require('express');
const router = express.Router();

// Import controllers
const pageController = require('./controllers/pageController');

// Add routes to router
router.get('/page', pageController.getPage);

module.exports = router
