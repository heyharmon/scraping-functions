const express = require('express');
const router = express.Router();

// Import controllers
const pageController = require('./controllers/pageController');
const pageLinksController = require('./controllers/pageLinksController');
const pageTablesController = require('./controllers/pageTablesController');
const pageFormsController = require('./controllers/pageFormsController');

// Add routes to router
router.get('/page', pageController.get);
router.get('/links', pageLinksController.get);
router.get('/tables', pageTablesController.get);
router.get('/forms', pageFormsController.get);

module.exports = router
