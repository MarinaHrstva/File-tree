import { createAsyncThunk } from "@reduxjs/toolkit";
import { getS3Instance } from "../services/awsServices";
import { RootState } from "./store";
import { FileItem, FileTreeType, FolderItem, SelectedFile } from "./types";

export const getFileTree = createAsyncThunk<
  FileTreeType[] | [],
  string,
  { state: RootState }
>("fileTree/getFileTree", async (prefix, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = getS3Instance(accessKeyId, secretKey, region);

  const createSubfoldersTree = async (
    currentPrefix: string
  ): Promise<FolderItem[]> => {
    const params = {
      Bucket: bucketName,
      Prefix: currentPrefix,
      Delimiter: "/",
    };

    const response = await s3.listObjectsV2(params).promise();
    const folders: FolderItem[] =
      response.CommonPrefixes?.map((folder) => ({
        name: folder.Prefix!,
        type: "folder",
        isOpen: false,
        subfolders: [],
      })) || [];

    const foldersWithSubfolders = await Promise.all(
      folders.map(async (folder) => ({
        ...folder,
        subfolders: await createSubfoldersTree(folder.name),
      }))
    );
    return foldersWithSubfolders;
  };
  return createSubfoldersTree(prefix);
});

export const getActiveFolderContent = createAsyncThunk<
  FileTreeType[] | [],
  string,
  { state: RootState }
>("fileTree/getActiveFolderContent", async (activeFolder, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = getS3Instance(accessKeyId, secretKey, region);

  const createSubfoldersTree = async (
    currentPrefix: string
  ): Promise<FileTreeType[]> => {
    const params = {
      Bucket: bucketName,
      Prefix: currentPrefix,
      Delimiter: "/",
    };

    const response = await s3.listObjectsV2(params).promise();

    const folders: FolderItem[] =
      response.CommonPrefixes?.map((folder) => ({
        name: folder.Prefix!,
        type: "folder",
        isOpen: false,
        subfolders: [],
        files: [],
      })) || [];

    const files: any[] = (response.Contents || [])
      .map((file) => {
        if (file.Key?.includes(".txt")) {
          return {
            name: file.Key!,
            type: "file" as const,
          };
        }
        return null;
      })
      .filter((f) => !!f);

    const foldersWithSubfoldersAndFiles = await Promise.all(
      folders.map(async (folder) => ({
        ...folder,
        subfolders: await createSubfoldersTree(folder.name),
        files: files,
      }))
    );

    return [...files, ...foldersWithSubfoldersAndFiles];
  };

  return createSubfoldersTree(activeFolder);
});

export const getFile = createAsyncThunk<
  SelectedFile,
  string,
  { state: RootState }
>("fileTree/getFile", async (fileName, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = getS3Instance(accessKeyId, secretKey, region);

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  const response = await s3.getObject(params).promise();
  const fileContent = response.Body?.toString() || "";

  return { fileName, fileContent };
});

export const addFile = createAsyncThunk<
  FileItem,
  { file: File; prefix: string },
  { state: RootState }
>("fileTree/addFile", async ({ file, prefix }, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = getS3Instance(accessKeyId, secretKey, region);

  const params = {
    Bucket: bucketName,
    Key: `${prefix}${file.name}`,
    Body: file,
  };

  await s3.upload(params).promise();

  return { name: `${prefix}${file.name}`, type: "file" };
});

export const addFolder = createAsyncThunk<
  FolderItem,
  string,
  { state: RootState }
>("fileTree/addFolder", async (folderName, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = getS3Instance(accessKeyId, secretKey, region);

  const currentPrefix = getState().fileTree.currentPrefix;
  const params = {
    Bucket: bucketName,
    Key: `${currentPrefix}${folderName}/`,
    Body: "",
  };

  await s3.putObject(params).promise();

  return {
    name: `${currentPrefix}${folderName}/`,
    type: "folder",
    isOpen: false,
    subfolders: [],
  };
});

export const deleteFileOrFolder = createAsyncThunk<
  string,
  { key: string },
  { state: RootState }
>("fileTree/deleteFileOrFolder", async ({ key }, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = getS3Instance(accessKeyId, secretKey, region);

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  await s3.deleteObject(params).promise();
  return key;
});
