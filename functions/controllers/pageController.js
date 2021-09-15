const cheerio = require('cheerio'),
      axios = require('axios')

const {
    fetchHtml,
    getTitle,
    getLinks,
    getCleanBody,
    getWordCount
} = require("../util/helpers")

const get = async (req, res) => {
    const startUrl = req.query.url
    if (startUrl) {

        let html = await axios.get(startUrl).catch((error) => {
            if (!error.response) {
                res.status(500).json({
                    status: 500,
                    message: 'There is a problem with that url'
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'Page not found'
                })
            }
        })

        const $ = cheerio.load(html.data);

        // Get page title
        const title = getTitle($)

        // Get all links
        const links = getLinks($, startUrl)

        // Get body
        const body = getCleanBody($)

        // Get word count
        const words = getWordCount(body)

        res.status(200).json({
            status: 200,
            title: title,
            words: words,
            body: body,
            links: links
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
