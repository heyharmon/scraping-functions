/**
 * Extract word count from a string
 *
 * @param  {String} string
 * @return {Number} Returns word count as number
 */
const getWordcount = (string) => {
    // Match on any sequence of non-whitespace characters
    return string.match(/\S+/g).length
}

module.exports = {
    getWordcount
}
