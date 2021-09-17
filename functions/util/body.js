const {
    removeLineBreaks,
    removeScripts,
    removeStyles,
    removeAnchors,
    removeIFrames,
    removeUrls
} = require("./stringHelpers")

/**
 * Get page body and remove unwanted html
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {String} Returns a new body as string
 */
const getBody = ($html) => {
    // Remove global elements which could be in the body
    $html('header, nav, footer').remove()

    // Now, get the body
    let body = $html('body').text()
        .trim() // Trim outer spaces

    // Remove unwanted html
    body = removeLineBreaks(body)
    body = removeScripts(body)
    body = removeStyles(body)
    body = removeAnchors(body)
    body = removeIFrames(body)
    body = removeUrls(body)

    return body
}

module.exports = {
    getBody
}
