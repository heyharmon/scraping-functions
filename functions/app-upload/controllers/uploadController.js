// const { getSignedUploadRequest } = require("../../services/S3/getSignedUploadRequest")

const AWS = require('aws-sdk');

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION
// });

const s3 = new AWS.S3({
  accessKeyId: 'AKIAVWKTQUISOH3CQJYK',
  secretAccessKey: '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',
  region: 'us-west-1'
});

const upload = async (req, res) => {

  s3.upload({
    Bucket: 'firebase-screenshot-function',
    Body: 'hello world',
    Key: 'screenshot.txt'
  })
  .promise()
  .then(response => {
    res.status(200).json({
      message: response
    })
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
  })
  
  // const hello = getSignedUploadRequest()
  // res.status(200).send(hello)
  // res.status(200).json({
  //   message: 'it did a thing',
  //   hello: hello
  // })
  
    // const path = req.query.path
    // if (path) {
    // 
    //     try {
    //         // Return
    //         // res.setHeader('Content-Type', 'image/png')
    //         res.status(200).send(path)
    // 
    //     } catch (error) {
    //       res.status(500).json({
    //           status: 500,
    //           message: 'The server encountered an unexpected error'
    //       })
    //     }
    // 
    // } else {
    //     res.status(400).json({
    //         message: 'Missing path parameter.'
    //     })
    // }
};

module.exports = {
  upload
};
