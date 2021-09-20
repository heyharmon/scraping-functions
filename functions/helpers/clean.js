/**
 * Remove all unwanted markup from string
 *
 * @param  {String} string
 * @return {String} Returns clean string
 */
const clean = (string) => {
    string = removeHtml(string)
    string = removeUrls(string)
    string = removeLineBreaks(string)

    return string
}

/**
 * Remove all html tags from a string
 *
 * @param  {String} string
 * @return {String} Returns string without html tags
 */
const removeHtml = (string) => {
    return string.replace(/(<([^>]+)>)/gi, '')
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
 * Remove all line breaks from a string
 *
 * @param  {String} string
 * @return {String} Returns string without line breaks
 */
const removeLineBreaks = (string) => {
    return string.replace(/\s+/g, ' ')
}

module.exports = {
    clean,
    removeHtml,
    removeUrls,
    removeLineBreaks,
}
