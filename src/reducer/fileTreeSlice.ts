import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AWS from "aws-sdk";
import { RootState } from "./store";

export type Nullable<T> = T | null;

export type FileItem = {
  name: string;
  type: "folder" | "file";
};

type fileTreeStateType = {
  fileTree: FileItem[] | [];
  currentPrefix: string;
  loading: boolean;
  error: Nullable<string>;
};

const initialState: fileTreeStateType = {
  fileTree: [],
  loading: false,
  currentPrefix: "",
  error: null,
};

export const getFileTree = createAsyncThunk<
  FileItem[] | [],
  string,
  { state: RootState }
>("fileTree/getFileTree", async (prefix, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });

  const params = {
    Bucket: bucketName,
    Prefix: prefix,
    Delimiter: "/",
  };
  const response = await s3.listObjectsV2(params).promise();
  const folders =
    response.CommonPrefixes?.map((folder) => {
      return {
        name: folder.Prefix,
        type: "folder",
      } as FileItem;
    }) || [];

  const files =
    response.Contents?.filter((file) => file.Key !== prefix).map((file) => {
      return {
        name: file.Key,
        type: "file",
      } as FileItem;
    }) || [];

  return [...folders, ...files];
});

export const addFile = createAsyncThunk<
  FileItem,
  { file: File; prefix: string },
  { state: RootState }
>("fileTree/addFile", async ({ file, prefix }, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });

  const params = {
    Bucket: bucketName,
    Key: `${prefix}${file.name}`,
    Body: file,
  };

  await s3.upload(params).promise();

  return { name: `${prefix}${file.name}`, type: "file" };
});

export const addFolder = createAsyncThunk<
  FileItem,
  string,
  { state: RootState }
>("fileTree/addFolder", async (folderName, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });

  const currentPrefix = getState().fileTree.currentPrefix;
  const params = {
    Bucket: bucketName,
    Key: `${currentPrefix}${folderName}/`,
    Body: "",
  };

  await s3.putObject(params).promise();

  return { name: `${currentPrefix}${folderName}/`, type: "folder" };
});

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setCurrentPrefix: (state, action: PayloadAction<string>) => {
      state.currentPrefix = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFileTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFileTree.fulfilled,
        (state, action: PayloadAction<FileItem[]>) => {
          state.fileTree = action.payload;
          state.loading = false;
        }
      )
      .addCase(getFileTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFile.fulfilled, (state, action: PayloadAction<FileItem>) => {
        state.loading = false;
        state.fileTree = [action.payload, ...state.fileTree];
      })
      .addCase(addFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default fileTreeSlice.reducer;
