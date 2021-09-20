const cheerio = require('cheerio')
const axios = require('axios')

const { getTitle } = require("../helpers/title")
const { getBodyText } = require("../helpers/body")
const { getWordCount } = require("../helpers/count")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {

        axios.get(url).then((html) => {

            // Setup Cheerio
            const $html = cheerio.load(html.data);

            // Get page title
            const title = getTitle($html)

            // Get body
            const body = getBodyText($html)

            // Get word count
            const words = getWordCount(body)

            // Return page
            res.status(200).json({
                status: 200,
                title: title,
                words: words,
                body: body,
            })

    // Page could not load
    }).catch((error) => {
        res.status(500).json({
            status: 500,
            message: error.code + ': ' + error.message
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
