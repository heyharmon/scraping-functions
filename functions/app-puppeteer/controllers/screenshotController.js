const { takeScreenshot } = require('../actions/takeScreenshot.js')
const { uploadFile } = require('../actions/uploadFile.js')

const get = async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ message: 'Missing parameter: url.' })
  }

  const url = new URL(req.query.url)
      
  try {
    let screenshot = await takeScreenshot(url, 'desktop')

    uploadFile(screenshot)
      .then(response => {
        res.status(200).json({ message: response })
      })
      .catch(error => {
        res.status(500).json({ message: 'There was a problem uploading to S3: ' + error })
      })

  } catch (error) {
    res.status(500).json({ message: 'Application error: ' + error })
  }
};

module.exports = {
  get
};
