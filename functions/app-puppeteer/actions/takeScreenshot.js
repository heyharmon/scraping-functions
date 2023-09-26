const puppeteer = require('puppeteer')
const scrollToBottom = require('puppeteer-autoscroll-down')
const { config } = require('../config.js')

const sizes = {
  desktop: {
    width: 1400,
    height: 900,
  },
  phone: {
    width: 600,
    height: 900,
  },
}

async function takeScreenshot(url, size) {
  const browser = await puppeteer.launch(config)
  const page = await browser.newPage()

  // Go to page
  await page.goto(url, { waitUntil: 'load' })
  await page.setViewport({ 
    width: sizes[size].width, 
    height: sizes[size].height,
  })

  // Scroll to the bottom to catch lazyload images
  await scrollToBottom(page)
  await page.evaluate(_ => { window.scrollTo(0, 0) })

  // Get the block
  let block = await page.$('.post-content')

  // Take screenshot
  const screenshot = await block.screenshot({
    type: 'jpeg',
    quality: 90
  })

  // Close the browser
  await browser.close()

  return screenshot;
}

module.exports = {
  takeScreenshot
}