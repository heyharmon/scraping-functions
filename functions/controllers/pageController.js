const cheerio = require('cheerio')
const got = require('got')

const getPage = async (req, res) => {
    // const url = req.query.url
    const url = 'https://bloomcu.com'

    if (url) {
        got(url).then(response => {
            const $ = cheerio.load(response.body)

            const title = $('title').first().text()

            const body = $('body').text().trim().replace(/(\r\n|\n|\r)/gm, '')

            const words = body.split(' ').length

            const links = $('a').map(function() {
                return {
                    text: $(this).text(),
                    url: $(this).attr('href')
                }
            }).get()

            res.status(200).json({
                title: title,
                words: words,
                links: links
            })
        }).catch(error => {
            console.log(error)
        });

    } else {
        res.status(400).json({
            message: 'Missing URL'
        })
    }
};

module.exports = {
  getPage
};
