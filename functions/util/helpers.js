const Url = require('url-parse')

// Extract title from html
const getTitle = ($) => {
    return $('title')
        .first() // Get first instance
        .text() // Get text
        .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces
}

// Extract all links from html
const getLinks = ($, baseUrl) => {
    return $('a').map(function() {
        // New parsed url. Use base url on relative links
        const url = new Url($(this).attr('href'), baseUrl)

        const text = getCleanLinkText($(this))

        if (url.protocol == 'https:' || url.protocol == 'http:' ) {
            return {
                text: text,
                url: url.origin + url.pathname + url.query,
                hostname: url.hostname
            }
        }

        if (url.protocol == 'tel:' || url.protocol == 'mailto:' ) {
            return {
                text: text,
                url: url.protocol + url.pathname,
                hostname: url.hostname
            }
        }
    }).get()
}

// Remove html from link inner text
const getCleanLinkText = ($) => {
    return $.children().remove().end() // Select and remove any html in link
        .text() // Get text
        .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces
}

// Remove all unwanted html from html body
const getCleanBody = ($) => {
    $('title, header, nav, footer').remove()

    let body = $('body').text()
    body = removeLineBreaks(body)
    body = removeScripts(body)
    body = removeStyles(body)
    body = removeAnchors(body)
    body = removeIFrames(body)
    body = removeUrls(body)

    return body
}

// Remove all line breaks from a string
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
    getLinks,
    getCleanBody,
    getWordCount
}
