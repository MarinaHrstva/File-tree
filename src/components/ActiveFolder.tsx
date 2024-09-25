import React, { useCallback, useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import FilePreview from "./FilePreview";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducer/store";
import { useDispatch } from "react-redux";
import { addFolder, getActiveFolderContent } from "../reducer/fileTreeSlice";
import Folder from "./Folder";
import File from "./File";

type Props = {
  activeFolder?: boolean;
};

function ActiveFolder({ activeFolder = true }: Props): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [folderName, setFolderName] = useState("");

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

  const onAddFolderHandler = useCallback(() => {
    if (folderName) {
      dispatch(addFolder(folderName));
    }
  }, [folderName, dispatch]);

  const onChangeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFolderName(e.target.value);
    },
    []
  );

  return (
    <div>
      {activeFolderContent &&
        activeFolderContent.map((f) => {
          if (f.type === "folder") {
            return <Folder folder={f} />;
          }
          return <File name={f.name} />;
        })}
      {activeFolder && (
        <div className="actions-container">
          <FileUpload />
          <input type="text" onChange={onChangeInputHandler} />
          <button onClick={onAddFolderHandler}>Create a Folder</button>
          <FilePreview />
        </div>
      )}
    </div>
  );
}

export default ActiveFolder;
