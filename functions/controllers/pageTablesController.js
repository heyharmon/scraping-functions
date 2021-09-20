const cheerio = require('cheerio')
const axios = require('axios')

const { getTables } = require("../helpers/tables")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {

        axios.get(url).then((html) => {

            // Setup Cheerio
            const $html = cheerio.load(html.data);

            // Return tables
            res.status(200).json({
                status: 200,
                tables: getTables($html)
            })

    // Page could not load
    }).catch((error) => {
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
