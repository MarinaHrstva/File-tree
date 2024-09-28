import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import FileUpload from "../ActionsComponents/FileUpload";
import FilePreview from "./../ActionsComponents/FilePreview";
import { AppDispatch, RootState } from "../../reducer/store";
import { useDispatch } from "react-redux";
import { getActiveFolderContent } from "../../reducer/fileTreeThunks";
import Folder from "../FileAndFolder/Folder";
import File from "../FileAndFolder/File";
import AddFolderComponent from "../ActionsComponents/AddFolderComponent";
import "./ActiveFolder.css";

function ActiveFolder(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const currentPrefix = useSelector(
    (state: RootState) => state.fileTree.currentPrefix
  );

  const activeFolderContent = useSelector(
    (state: RootState) => state.fileTree.activeFolderContent
  );

  useEffect(() => {
    if (currentPrefix) {
      dispatch(getActiveFolderContent(currentPrefix));
    }
  }, [dispatch, currentPrefix]);

  return (
    <div className="active-folder__container">
      <div className="active-folder__items-wrapper">
        <div className="active-folder-file-tree__container">
          {!activeFolderContent.length && <p>The selected folder is empty</p>}
          {activeFolderContent &&
            activeFolderContent.map((f) => {
              if (f.type === "folder") {
                return <Folder folder={f} margin={0} key={f.name} />;
              }
              return <File name={f.name} key={f.name} />;
            })}
        </div>
        <FilePreview />
      </div>

      <div className="actions__container">
        <FileUpload />
        <AddFolderComponent />
      </div>
    </div>
  );
}

export default ActiveFolder;
