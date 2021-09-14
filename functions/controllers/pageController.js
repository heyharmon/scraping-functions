const cheerio = require('cheerio'),
      axios = require('axios')

const {
    getTitle,
    getLinkFromAnchor,
    getCleanBody,
    getWordCount
} = require("../util/helpers")

const get = async (req, res) => {
    const startUrl = req.query.url

    if (startUrl) {

        axios.get(startUrl)
        .then((html) => {
            const $ = cheerio.load(html.data);

            // Get page title
            const title = getTitle($)

            // Get all links
            const links = $('a').map(function() {
                return getLinkFromAnchor($(this), startUrl)
            }).get()

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
        })
        .catch(error => {
            res.status(500).json({
                status: 500,
                message: 'Internal server error'
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
