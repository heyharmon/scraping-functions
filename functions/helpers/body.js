const { clean } = require("./clean")

/**
 * Get just the body
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {Function} Page html as Cheerio function except removed elements
 */
const getBody = ($html) => {
    // Remove global elements which could be in the body
    $html('header, nav, footer').remove()

    return $html('body')
}

/**
 * Get just the body written content
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {String} Returns a new body as string
 */
const getBodyText = ($html) => {
    let body = getBody($html);
        body = body.text().trim()

    // Return only written content
    return clean(body)
}

module.exports = {
    getBody,
    getBodyText
}
