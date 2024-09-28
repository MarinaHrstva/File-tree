import AWS from "aws-sdk";

export const getS3Instance = (
  accessKeyId: string,
  secretKey: string,
  region: string
) => {
  return new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });
};
