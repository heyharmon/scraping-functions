const cheerio = require('cheerio')

const { getHtml } = require("../helpers/http")
const { getTitle } = require("../helpers/title")
const { getBodyText } = require("../helpers/body")
const { getWordcount } = require("../helpers/count")
const { getLinks } = require("../helpers/links")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {
        const html = await getHtml(url, res)

        const title = getTitle(html)
        const body = getBodyText(html)
        const wordcount = getWordcount(body)

        // Get links
        // TODO: Optionally pass selector for header/nav/footer for accuracy
        const links = getLinks(html, url)

        res.status(200).json({
            status: 200,
            title: title,
            wordcount: wordcount,
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
