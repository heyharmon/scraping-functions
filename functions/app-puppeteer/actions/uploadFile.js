require('dotenv').config();
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function uploadFile(file) {
  
  const upload = new Promise((resolve, reject) => {
    s3.upload({
      Bucket: 'fusion-block-screenshots',
      Body: file,
      Key: 'local' + '-' + Math.random().toString(36).slice(2, 7) + '.jpeg',
    }, (error, response) => {
      if (error) {
        reject(new Error('There was a problem with uploading to S3: ', error))
      } else {
        resolve(response)
      }
    })
  })

  return upload

  // s3.upload({
  //   Bucket: 'fusion-block-screenshots',
  //   Body: file,
  //   Key: 'local' + '-' + Math.random().toString(36).slice(2, 7) + '.jpeg',
  // })
  // .promise()
  // .then(response => {
  //   return response
  // })
  // .catch(error => {
  //   res.status(500).json({
  //     status: 500,
  //     message: 'There was a problem uploading to S3:' + error
  //   })
  // })
}

module.exports = {
  uploadFile
}