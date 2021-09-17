/**
 * Remove all line breaks from a string
 *
 * @param  {String} string
 * @return {String} Returns string without line breaks
 */
const removeLineBreaks = (string) => {
    return string.replace(/\s+/g, ' ')
}

/**
 * Remove all <script> tags from a string
 *
 * @param  {String} string
 * @return {String} Returns string without script tags
 */
const removeScripts = (string) => {
    return string.replace(/<script.*?>.*?<\/script>/igm, '')
}

/**
 * Remove all <style> tags from a string
 *
 * @param  {String} string
 * @return {String} Returns string without style tags
 */
const removeStyles = (string) => {
    return string.replace(/<style.*?>.*?<\/style>/igm, '')
}

/**
 * Remove all <a> tags from a string
 *
 * @param  {String} string
 * @return {String} Returns string without anchor tags
 */
const removeAnchors = (string) => {
    return string.replace(/<a.*?>.*?<\/a>/igm, '')
}

/**
 * Remove all <iframe> tags from a string
 *
 * @param  {String} string
 * @return {String} Returns string without iframe tags
 */
const removeIFrames = (string) => {
    return string.replace(/<iframe.*?>.*?<\/iframe>/igm, '')
}

/**
 * Remove all URLs from a string
 *
 * @param  {String} string
 * @return {String} Returns string without urls
 */
const removeUrls = (string) => {
    return string.replace(/(?:https?|www):\/\/[\n\S]+/g, '')
}

/**
 * Extract word count from a string
 *
 * @param  {String} string
 * @return {Number} Returns word count as number
 */
const getWordCount = (string) => {
    // Match on any sequence of non-whitespace characters
    return string.match(/\S+/g).length
}

module.exports = {
    removeLineBreaks,
    removeScripts,
    removeStyles,
    removeAnchors,
    removeIFrames,
    removeUrls,
    getWordCount
}
