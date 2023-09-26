const puppeteer = require('puppeteer'),
      { config } = require('../config.js');

const get = async (req, res) => {
    if (req.query.url) {
        const url = new URL(req.query.url)
        
        try {
            // Setup browser
            const browser = await puppeteer.launch(config)

            // Load page
            const page = await browser.newPage()
            await page.goto(url, { waitUntil: 'load' })
            await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
            
            const data = await page.evaluate(() => {
              // Get links
              let links = $('a').map(function() {
                return {
                  title: $(this).text(),
                  url: $(this).attr('href'),
                }
              }).get()
              
              return links
            })
            
            /* Run javascript inside the page */
            // const links = await page.$$eval('a', anchors => {
            //   return anchors.map((anchor) => {
            //     return {
            //       href: anchor.href,
            //       // text: anchor.innerText()
            //     }
            //   })
            // })

            // const links = await page.$$eval('a', as => as.map(a => a.href));

            // Close the browser
            await browser.close()
            
            res.status(200).json({
              data: data
            })
            
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
