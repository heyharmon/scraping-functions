const cheerio = require('cheerio'),
      Url = require('url-parse')

// Extract title from Cheerio instance
const getTitle = ($) => {
    return $('title')
        .first() // Get first instance
        .text() // Get text
        .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces
}

// Extract link text and url from anchhor
const getLinkFromAnchor = (anchor, baseUrl) => {
    // Parse url
    const url = new Url(anchor.attr('href'), baseUrl)

    // Ignore links without an origin
    // This rules out links containing javascript, tel, mail, etc
    if (url.origin !== 'null') {
        const text = anchor
            .children().remove().end() // Select and remove any html in link
            .text() // Get text
            .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces

        return {
            text: text,
            url: url.origin + url.pathname // Eliminate hashes and params
        }
    }
}



// Remove all unwanted html tags from a string
const getCleanBody = ($) => {
    // Remove header, navigation and footer
    $('header, nav, footer').remove()

    clean = $('body').text()
    clean = removeLineBreaks(clean)
    clean = removeScripts(clean)
    clean = removeStyles(clean)
    clean = removeAnchors(clean)
    clean = removeIFrames(clean)
    clean = removeUrls(clean)

    return clean
}

const removeLineBreaks = (string) => {
    return string.replace(/\s+/g, ' ')
}

// Remove all <script> tags from a string
const removeScripts = (string) => {
    return string.replace(/<script.*?>.*?<\/script>/igm, '')
}

// Remove all <style> tags from a string
const removeStyles = (string) => {
    return string.replace(/<style.*?>.*?<\/style>/igm, '')
}

// Remove all <a> tags from a string
const removeAnchors = (string) => {
    return string.replace(/<a.*?>.*?<\/a>/igm, '')
}

// Remove all <iframe> tags from a string
const removeIFrames = (string) => {
    return string.replace(/<iframe.*?>.*?<\/iframe>/igm, '')
}

// Remove all URLs (http(s), www) from a string
const removeUrls = (string) => {
    return string.replace(/(?:https?|www):\/\/[\n\S]+/g, '')
}

// Extract word count from a string
const getWordCount = (string) => {

    // Match on any sequence of non-whitespace characters
    return string.match(/\S+/g).length
}

module.exports = {
    getTitle,
    getLinkFromAnchor,
    getCleanBody,
    getWordCount
}
