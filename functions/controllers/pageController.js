const cheerio = require('cheerio'),
      axios = require('axios')

const { getWordCount } = require("../util/helpers");

const get = async (req, res) => {
    const url = req.query.url
    if (url) {

        axios.get(url)
        .then((html) => {
            const $ = cheerio.load(html.data);

            const title = $('title').first().text()
            const body = $('body').text().replace(/\s+/g, ' ')
            const words = getWordCount(body)

            const links = $('a').map(function() {
                return {
                    text: $(this).text().replace(/\s+/g, ' '),
                    url: $(this).attr('href')
                }
            }).get()

            res.status(200).json({
                status: 200,
                title: title,
                words: words,
                links: links
            })
        })
        .catch(error => {
            if (error.response.status == 404) {
                res.status(404).json({
                    status: 404,
                    message: 'Url cannot be loaded'
                })
            }
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
