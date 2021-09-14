const cheerio = require('cheerio'),
      axios = require('axios'),
      Url = require('url-parse');

const { getWordCount, cleanHtml } = require("../util/helpers");

const get = async (req, res) => {
    const startUrl = req.query.url

    if (startUrl) {

        axios.get(startUrl)
        .then((html) => {
            const $ = cheerio.load(html.data);

            // Get page title
            const title = $('title')
                .first() // Get first instance
                .text() // Get text
                .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces

            /**
             * Get links
             * --------
             */
            // Get all links
            const links = $('a').map(function() {
                // Parse url
                const url = new Url($(this).attr('href'), startUrl)

                // Ignore links without an origin
                // This rules out links containing javascript, tel, mail, etc
                if (url.origin !== 'null') {
                    const text = $(this)
                        .children().remove().end() // Select and remove any html in link
                        .text() // Get text
                        .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces

                    return {
                        text: text,
                        url: url.origin + url.pathname // Eliminate hashes and params
                    }
                }
            }).get()

            /**
             * Get cleaned body
             * --------
             */
            // Remove header, navigation and footer
            $('header, nav, footer').remove()

            // Get body
            const body = $('body')
                .text() // Get text
                .replace(/\s+/g, ' ') // Remove line breaks

            // Get word count
            const words = getWordCount(body)

            res.status(200).json({
                status: 200,
                title: title,
                words: words,
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
