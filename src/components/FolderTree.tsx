import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducer/store";
import { FileTreeType, setCurrentPrefix } from "../reducer/fileTreeSlice";
import { useDispatch } from "react-redux";
import Folder from "./Folder";

function FolderTree() {
  const folders = useSelector((state: RootState) => state.fileTree.fileTree);
  const dispatch = useDispatch<AppDispatch>();

  const handleFolderClick = useCallback(
    (folder: FileTreeType) => {
      dispatch(setCurrentPrefix(folder.name));
    },
    [dispatch]
  );

  return (
    <div className="folder-tree_container">
      <div className="main-folder">Main Folder</div>
      {folders.map((folder) => (
        <Folder
          key={folder.name}
          folder={folder}
          onDoubleClick={handleFolderClick}
        />
      ))}
    </div>
  );
}

export default FolderTree;
