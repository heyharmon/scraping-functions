// Extract word count from a string
const getWordCount = (string) => {
    // Match on any sequence of non-whitespace characters
    return string.match(/\S+/g).length
}

// Remove all unwanted html tags from a string
const cleanHtml = (string) => {
    string = removeLineBreaks(string)
    string = removeScripts(string)
    string = removeStyles(string)
    string = removeAnchors(string)
    string = removeIFrames(string)
    string = removeUrls(string)

    return string
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

module.exports = {
    getWordCount,
    cleanHtml
}
