const cheerio = require('cheerio')
const axios = require('axios')

const { getLinks } = require("../helpers/links")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {

        axios.get(url).then((html) => {

            // Setup Cheerio
            const $html = cheerio.load(html.data);

            // TODO: Response with true/false whether header/nav/footer tags exist
            // This way, we can react and only crawl links if we can specify selectors

            // Get links
            // TODO: Optionally pass selector for header/nav/footer for accuracy
            const links = getLinks($html, url)

            // Return forms
            res.status(200).json({
                status: 200,
                links: links
            })

    // Page could not load
    }).catch((error) => {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    })

    } else {
        res.status(400).json({
            message: 'Missing url parameter.'
        })
    }
};

module.exports = {
  get
};
