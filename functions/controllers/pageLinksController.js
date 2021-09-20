const cheerio = require('cheerio')

const { getHtml } = require("../helpers/http")
const { getLinks } = require("../helpers/links")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {
        const html = await getHtml(url, res)

        // TODO: Response with true/false whether header/nav/footer tags exist
        // This way, we can react and only crawl links if we can specify selectors

        // Get links
        // TODO: Optionally pass selector for header/nav/footer for accuracy
        const links = getLinks(html, url)

        // Return forms
        res.status(200).json({
            status: 200,
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
