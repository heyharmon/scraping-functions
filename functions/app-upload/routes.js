const express = require('express');
const router = express.Router();

// Import controllers
const uploadController = require('./controllers/uploadController');

// Add routes to router
router.get('/', uploadController.upload);

module.exports = router
