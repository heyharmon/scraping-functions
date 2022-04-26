const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/**
 * Get a signed upload request object
 *
 * @param  {Object} file File object
 * @return {Object} Returns a signed upload request object
 */
const getSignedUploadRequest = () => {
  
  // (async () => {
  //   await s3.putObject({
  //     Body: 'hello world',
  //     Bucket: 'firebase-screenshot-function',
  //     Key: 'screenshot.txt'
  //   }).promise();
  // })
  
  return s3.putObject({
    Body: 'hello world',
    Bucket: 'firebase-screenshot-function',
    Key: 'screenshot.txt'
  })
  
}

module.exports = {
  getSignedUploadRequest
}
