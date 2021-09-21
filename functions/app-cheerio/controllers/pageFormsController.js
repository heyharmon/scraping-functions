const cheerio = require('cheerio')

const { getHtml } = require("../helpers/http")
const { getForms } = require("../helpers/forms")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {
        const html = await getHtml(url, res)

        // Get forms
        const forms = getForms(html)

        // Return forms
        res.status(200).json({
            status: 200,
            forms: forms
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
