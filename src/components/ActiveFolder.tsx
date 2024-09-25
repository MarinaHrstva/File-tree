import React, { useEffect } from "react";
import FileUpload from "./FileUpload";
import FilePreview from "./FilePreview";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducer/store";
import { useDispatch } from "react-redux";
import { getActiveFolderContent } from "../reducer/fileTreeSlice";
import Folder from "./Folder";
import File from "./File";
import AddFolderComponent from "./AddFolderComponent";

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
    <div>
      {activeFolderContent &&
        activeFolderContent.map((f) => {
          if (f.type === "folder") {
            return <Folder folder={f} />;
          }
          return <File name={f.name} />;
        })}

      <div className="actions-container">
        <AddFolderComponent />
        <FileUpload />
        <FilePreview />
      </div>
    </div>
  );
}

export default ActiveFolder;
