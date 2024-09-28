export type Nullable<T> = T | null;

export type FileItem = {
  name: string;
  type: "file";
};

export type FolderItem = {
  name: string;
  type: "folder";
  isOpen: boolean;
  subfolders: any[];
};
export type SelectedFile = {
  fileName: string;
  fileContent: string;
};
export type FileTreeType = FileItem | FolderItem;

export type fileTreeStateType = {
  fileTree: FileTreeType[] | [];
  currentPrefix: string;
  selectedFile: Nullable<SelectedFile>;
  activeFolderContent: FileTreeType[] | [];
  loading: boolean;
  error: Nullable<string>;
};
