/**
 * Get page title from html
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {String} Returns clean title as string
 */
 const getTitle = ($html) => {
     return $html('title')
         .first() // Get first instance
         .text() // Get text
         .replace(/\s+/g, ' ').trim() // Remove line breaks then trim outer spaces
 }

module.exports = {
    getTitle
}
