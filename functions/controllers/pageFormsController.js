const cheerio = require('cheerio')
const axios = require('axios')

const { getForms } = require("../helpers/forms")

const get = async (req, res) => {
    const url = req.query.url
    if (url) {

        axios.get(url).then((html) => {

            // Setup Cheerio
            const $html = cheerio.load(html.data);

            // Get forms
            const forms = getForms($html)

            // Return forms
            res.status(200).json({
                status: 200,
                forms: forms
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
