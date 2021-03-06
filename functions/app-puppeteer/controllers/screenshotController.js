const puppeteer = require('puppeteer'),
      scrollPageToBottom = require('puppeteer-autoscroll-down')

const { config } = require('../config.js')

const get = async (req, res) => {
    const url = req.query.url
    if (url) {

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

            // Return screenshot
            res.setHeader('Content-Type', 'image/png')
            res.status(200).send(screenshot)

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
