import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AWS from "aws-sdk";
import { RootState } from "./store";

export type Nullable<T> = T | null;

export type FileItem = {
  name: string;
  type: "file";
};

export type FolderItem = {
  name: string;
  type: "folder";
  isOpen: boolean;
  subfolders: FileTreeType[] | [];
};
export type SelectedFile = {
  fileName: string;
  fileContent: string;
};
export type FileTreeType = FileItem | FolderItem;

type fileTreeStateType = {
  fileTree: FileTreeType[] | [];
  currentPrefix: string;
  selectedFile: Nullable<SelectedFile>;
  activeFolderContent: FileTreeType[] | [];
  loading: boolean;
  error: Nullable<string>;
};

const initialState: fileTreeStateType = {
  fileTree: [],
  activeFolderContent: [],
  currentPrefix: "",
  selectedFile: null,
  loading: false,
  error: null,
};

export const getFileTree = createAsyncThunk<
  FileTreeType[] | [],
  string,
  { state: RootState }
>("fileTree/getFileTree", async (prefix, { getState }) => {
  const { accessKeyId, secretKey, region, bucketName } = getState().credentials;

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });

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

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });

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

    const files: FileItem[] =
      response.Contents?.map((file) => ({
        name: file.Key!,
        type: "file",
      })) || [];

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

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey: secretKey,
    region: region,
  });

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
  FolderItem,
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

  return {
    name: `${currentPrefix}${folderName}/`,
    type: "folder",
    isOpen: false,
    subfolders: [],
  };
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
        (state, action: PayloadAction<FileTreeType[]>) => {
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
      })
      .addCase(addFolder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addFolder.fulfilled,
        (state, action: PayloadAction<FolderItem>) => {
          state.loading = false;
        }
      )
      .addCase(addFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getActiveFolderContent.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveFolderContent.fulfilled, (state, action) => {
        state.loading = false;
        state.activeFolderContent = action.payload;
      })
      .addCase(getActiveFolderContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(getFile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFile.fulfilled,
        (state, action: PayloadAction<SelectedFile>) => {
          state.loading = false;
          state.selectedFile = action.payload;
        }
      )
      .addCase(getFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default fileTreeSlice.reducer;
export const { setCurrentPrefix } = fileTreeSlice.actions;
