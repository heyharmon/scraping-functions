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
        return axios.get('https://scrappy.bloomcu.com/')
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
