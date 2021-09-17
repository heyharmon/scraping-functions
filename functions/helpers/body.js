const { clean } = require("./clean")

/**
 * Get page body and remove unwanted html
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {String} Returns a new body as string
 */
const getBody = ($html) => {
    // Remove global elements which could be in the body
    $html('header, nav, footer').remove()

    // Get only written content
    let body = clean($html('body').text().trim())

    return body
}

module.exports = {
    getBody
}
