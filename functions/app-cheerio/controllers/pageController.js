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
        // TODO: Optionally pass css selectors for header, navbar, footer for better accuracy
        // https://stackoverflow.com/questions/44690023/cheerio-how-to-ignore-elements-of-a-certain-tag

        const title = getTitle(html)
        const links = getLinks(html, url)
        const body = getBodyText(html)
        const wordcount = getWordcount(body)

        res.status(200).json({
            status: 200,
            title: title,
            wordcount: wordcount,
            // body: body,
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
