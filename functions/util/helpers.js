// Get page title
const getPageTitle = () => {
    return $('title').first().text()
}

// Extract word count from a string
const getWordCount = (string) => {
    string = removeScripts(string)
    return string.match(/\S+/g).length
}

// Remove all script tags from a string
const removeScripts = (string) => {
    return string.replace(/<script.*?>.*?<\/script>/igm, '')
}

module.exports = {
    getWordCount,
    removeScripts
}
