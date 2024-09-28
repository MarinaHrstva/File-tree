import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  FileItem,
  fileTreeStateType,
  FileTreeType,
  FolderItem,
  SelectedFile,
} from "./types";
import {
  addFile,
  addFolder,
  deleteFileOrFolder,
  getActiveFolderContent,
  getFile,
  getFileTree,
} from "./fileTreeThunks";

export const initialState: fileTreeStateType = {
  fileTree: [],
  activeFolderContent: [],
  currentPrefix: "",
  selectedFile: null,
  loading: false,
  error: null,
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setCurrentPrefix: (state, action: PayloadAction<string>) => {
      state.currentPrefix = action.payload;
    },
    resetSelectedFile: (state) => {
      state.selectedFile = null;
    },
    resetInitialState: (state) => {
      state.activeFolderContent = [];
      state.currentPrefix = "";
      state.fileTree = [];
      state.error = null;
      state.loading = false;
      state.selectedFile = null;
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
        state.activeFolderContent = [
          action.payload,
          ...state.activeFolderContent,
        ];
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
          state.activeFolderContent = [
            ...state.activeFolderContent,
            action.payload,
          ];
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
      })
      .addCase(deleteFileOrFolder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFileOrFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.activeFolderContent = JSON.parse(
          JSON.stringify(state.activeFolderContent)
        ).filter((f: FileTreeType) => f.name !== action.payload);
        state.error = null;
      })
      .addCase(deleteFileOrFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default fileTreeSlice.reducer;
export const { setCurrentPrefix, resetInitialState, resetSelectedFile } =
  fileTreeSlice.actions;
