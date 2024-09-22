import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;

export const getFiles = async (prefix = "") => {
  const params = {
    Bucket: bucketName as string,
    Prefix: prefix,
    Delimiter: "/",
  };
  try {
    const response = await s3.listObjectsV2(params).promise();

    const folders =
      response.CommonPrefixes?.map((folder) => ({
        name: folder.Prefix,
        type: "folder",
      })) || [];

    const files =
      response.Contents?.filter((file) => file.Key !== prefix).map((file) => ({
        name: file.Key,
        type: "file",
      })) || [];

    return [...folders, ...files];
  } catch (error) {
    alert("error");
    throw error;
  }
};

export const addFile = async (file: File) => {
  const params = {
    Bucket: bucketName as string,
    Key: file.name,
    Body: file,
  };

  try {
    await s3.upload(params).promise();
    //TODO Successfully added file
  } catch (error) {
    //TODO: Error handling
  }
};

export const deleteFile = async (filePath: string) => {
  const params = {
    Bucket: bucketName as string,
    Key: filePath,
  };

  try {
    await s3.deleteObject(params).promise();
    //TODO Successfully deleted file
  } catch (error) {
    //TODO: Error handling
  }
};
