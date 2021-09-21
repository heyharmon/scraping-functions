const express = require("express")
const cheerio = require('cheerio')
const axios = require('axios')

/**
 * Get html string for a given URL
 *
 * @param  {String} url Webpage url
 * @return {String} Returns page as string of html
 */
const getHtml = async (url, res) => {
    try {
        // Try axios
        return await axios.get(url)
            .then((html) => {
                return cheerio.load(html.data)
            })
    } catch {
        // Use Scraper API
        return axios.get('http://api.scraperapi.com/?api_key=fedd4443a9adb164a0b7110b0aed4923&url=' + url, { timeout: 30000 })
            .then((html) => {
                return cheerio.load(html.data)
            })
            .catch((error) => {
                // Page could not load
                res.status(500).json({
                    status: 500,
                    message: error.code + ': ' + error.message
                })
            })
    }
}

module.exports = {
    getHtml
}
