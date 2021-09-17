const cheerio = require('cheerio')
const axios = require('axios')

const {
    getTitle,
    getLinks,
    getCleanBody,
    getWordCount
} = require("../util/helpers")

const get = async (req, res) => {
    const startUrl = req.query.url
    if (startUrl) {

        axios.get(startUrl).then((html) => {

            // Setup Cheerio
            const $ = cheerio.load(html.data);

            // Get page title
            const title = getTitle($)

            // Get all links
            const links = getLinks($, startUrl)

            // Get body
            const body = getCleanBody($)

            // Get word count
            const words = getWordCount(body)

            // Return page
            res.status(200).json({
                status: 200,
                title: title,
                words: words,
                body: body,
                links: links
            })

    // Page could not load
    }).catch((error) => {
        console.log(error)
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
