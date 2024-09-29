import React, { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../reducer/store";
import Folder from "../FileAndFolder/Folder";
import { setCurrentPrefix } from "../../reducer/fileTreeSlice";
import "./FolderTree.css";

const FolderTree: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const folders = useSelector((state: RootState) => state.fileTree.fileTree);
  const currentPrefix = useSelector(
    (state: RootState) => state.fileTree.currentPrefix
  );

  const handleMainFolderDoubleClick = useCallback(() => {
    dispatch(setCurrentPrefix(""));
  }, [dispatch]);

  const additionalClassName = currentPrefix === "" && "active-folder";

  return (
    <div className="folder-tree__container">
      <div
        className={`folder-item ${additionalClassName}`}
        onDoubleClick={handleMainFolderDoubleClick}
      >
        Main Folder
      </div>
      {folders.map((folder, i) => (
        <Folder key={folder.name} folder={folder} />
      ))}
    </div>
  );
};

export default FolderTree;
