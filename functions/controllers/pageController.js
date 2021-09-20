const cheerio = require('cheerio')

const { getHtml } = require("../helpers/http")
const { getTitle } = require("../helpers/title")
const { getBodyText } = require("../helpers/body")
const { getWordCount } = require("../helpers/count")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {
        const html = await getHtml(url, res)

        // res.status(200).json({
        //     status: 200,
        //     data: page
        // })

        // const $html = cheerio.load(html)

        const title = getTitle(html)
        const body = getBodyText(html)
        const words = getWordCount(body)

        res.status(200).json({
            status: 200,
            title: title,
            words: words,
            body: body,
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
