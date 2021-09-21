const cheerio = require('cheerio')

const { getHtml } = require("../helpers/http")
const { getTables } = require("../helpers/tables")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {
        const html = await getHtml(url, res)

        // Get tables
        const tables = getTables(html)

        // Return tables
        res.status(200).json({
            status: 200,
            tables: tables
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
