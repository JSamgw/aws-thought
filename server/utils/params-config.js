const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
  
    const imageParams = {
      // Replace the <My_Bucket_Name> with the name of your own S3 bucket
      Bucket: 'user-images-9b76f6b4-4002-4887-9172-ba20edf015d5', 
      Key: `${uuidv4()}.${fileType}`,
      Body: fileName.buffer,
      ACL: 'public-read', // allows read access to this file, To access the images in the bucket from a public URL
    };
  
    return imageParams;
  };

  module.exports = params;