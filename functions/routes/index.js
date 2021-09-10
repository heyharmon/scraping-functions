const express = require('express');
const router = express.Router();

// Controllers
const pageController = require('../controllers/pageController');

// Routes
router.get('/page', pageController.getPage);

module.exports = router
