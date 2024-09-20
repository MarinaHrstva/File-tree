import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;

export const getFiles = async () => {
  try {
    const params = {
      Bucket: bucketName as string,
    };
    const response = await s3.listObjectsV2(params).promise();
    return response.Contents;
  } catch (error) {
    alert("error");
    throw error;
  }
};
