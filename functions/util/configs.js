// Default config for Puppeteer browser
const puppeteerBrowserConfig =  {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: {
        width:1680,
        height:1050
    },
    args: [
        '--no-sandbox',
        '--window-size=1680,1050'
    ]
}

module.exports = {
    puppeteerBrowserConfig
}
