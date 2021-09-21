const { getElementDomPath } = require("./dom")

/**
 * Extract all tables from html
 *
 * @param  {Function} $html Page html as Cheerio function
 * @return {Array} Returns array of table objects
 */
const getTables = ($html) => {
    const tables = $html('table').map(function() {
        const table = $html(this)
            .prop('outerHTML') // Get outer <table> tag
            .replace(/\s+/g, ' ') // Remove line breaks

        const domPath = getElementDomPath($html(this))

        return {
            table: table,
            domPath: domPath,
        }
    }).get()

    return tables
}

module.exports = {
    getTables
}
