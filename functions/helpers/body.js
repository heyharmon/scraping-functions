const { clean } = require("./clean")

/**
 * Get just the body written content
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {String} Returns a new body as string
 */
const getBodyText = ($html) => {
    // Remove global elements which could be in the body
    $html('header, nav, footer').remove()

    let body = $html('body')
        .text()
        .trim()

    return clean(body)
}

module.exports = {
    getBodyText
}
