require('dotenv').config();

const puppeteer = require('puppeteer'),
      scrollPageToBottom = require('puppeteer-autoscroll-down'),
      { config } = require('../config.js'),
      AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const get = async (req, res) => {
    if (req.query.url) {
        const url = new URL(req.query.url)
        
        try {
            // Setup browser
            const browser = await puppeteer.launch(config)

            // Load page
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'load' })

            // Set the viewport
            await page.setViewport({ width: 1400, height: 900 });

            // Scroll to the bottom to catch lazyload images
            await scrollPageToBottom(page)

            // Scroll to the very top of the page
            await page.evaluate(_ => {
              window.scrollTo(0, 0)
            })

            // Take screenshot
            const screenshot = await page.screenshot({
                fullPage: true,
                type: 'jpeg',
                quality: 85
            })

            // Close the browser
            await browser.close()
            
            // Upload screenshot
            s3.upload({
              Bucket: 'firebase-screenshot-function',
              Body: screenshot,
              Key: url.hostname + '-' + Math.random().toString(36).slice(2, 7) + '.jpeg'
            })
            .promise()
            .then(response => {
              res.status(200).json({
                message: response
              })
            })
            .catch(error => {
              res.status(500).json({
                message: error
              })
            })
            
            // Return
            // res.setHeader('Content-Type', 'image/png')
            // res.status(200).send(screenshot)

        } catch (error) {
          res.status(500).json({
              status: 500,
              message: 'The server encountered an unexpected error'
          })
        }

    } else {
        res.status(400).json({
            message: 'Missing url parameter.'
        })
    }
};

module.exports = {
  get
};
