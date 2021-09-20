const { getElementDomPath } = require("./dom")

/**
 * Extract all forms from html
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {Array} Returns array of form objects
 */
const getForms = ($html) => {
    const forms = $html('form').map(function() {
        const form = $html(this)
            .prop('outerHTML') // Get outer <form> tag
            .replace(/\s+/g, ' ') // Remove line breaks

        const domPath = getElementDomPath($html(this))

        return {
            form: form,
            domPath: domPath,
        }
    }).get()

    return forms
}

module.exports = {
    getForms
}
