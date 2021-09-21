/**
 * Get the absolute DOM path for an element
 *
 * @param  {Function} $element DOM element as Cheerio function
 * @return {Sring} Returns element DOM path as string
 */
const getElementDomPath = ($element) => {
    let path, node = $element;

    while (node.length) {
        const realNode = node[0]
        let name = realNode.name

        if (!name) break;
        name = name.toLowerCase();

        const parent = node.parent();
        const sameTagSiblings = parent.children(name);

        if (sameTagSiblings.length > 1) {
            const allSiblings = parent.children();
            const index = allSiblings.index(realNode) + 1;
            if (index > 1) {
                name += ':nth-child(' + index + ')';
            }
        }

        path = name + (path ? ' ' + path : '');
        node = parent;
    }

    return path;
}

/**
 * Get location of element, described as
 * within header, body or footer
 *
 * @param  {Function} $element Element html as Cheerio function
 * @return {String} Returns location as string
 */
const getElementLocation = ($element) => {
    // Header
    if (
        isWithin($element, 'header, nav') ||
        isBefore($element, 'header')
    ) { return 'header' }

    // Footer
    if (
        isWithin($element, 'footer') ||
        isAfter($element, 'footer')
    ) { return 'footer' }

    // Body
    return 'body'
}

/**
 * Check if element is within another element
 * Outer element is matched against Cheerio selector
 *
 * @param  {Function} $element DOM element as Cheerio function
 * @param  {String} selector Outer element selector e.g., 'div.class'
 * @return {Boolean} Returns true or false
 */
const isWithin = ($element, selector) => {
    return $element.parents(selector).length !== 0
}

/**
 * Check if element comes before another element
 * Succeeding element is matched against Cheerio selector
 *
 * @param  {Function} $element DOM element as Cheerio function
 * @param  {String} selector Succeeding element selector e.g., 'div.class'
 * @return {Boolean} Returns true or false
 */
const isBefore = ($element, selector) => {
    return $element.nextAll(selector).length !== 0
}

/**
 * Check if element comes after another element
 * Preceding element is matched against Cheerio selector
 *
 * @param  {Function} $element DOM element as Cheerio function
 * @param  {String} selector Preceding element selector e.g., 'div.class'
 * @return {Boolean} Returns true or false
 */
const isAfter = ($element, selector) => {
    return $element.prevAll(selector).length !== 0
}

module.exports = {
    getElementDomPath,
    getElementLocation,
    isWithin,
    isBefore,
    isAfter
}
