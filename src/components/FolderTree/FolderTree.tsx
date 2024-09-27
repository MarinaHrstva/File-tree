import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../reducer/store";
import Folder from "../FileAndFolder/Folder";
import "./FolderTree.css";

function FolderTree() {
  const folders = useSelector((state: RootState) => state.fileTree.fileTree);

  return (
    <div className="folder-tree__container">
      {folders.map((folder) => (
        <Folder key={folder.name} folder={folder} />
      ))}
    </div>
  );
}

export default FolderTree;
