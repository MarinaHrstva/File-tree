import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../reducer/store";
import { addFolder } from "../../reducer/fileTreeSlice";
import "./AddFolderComponent.css";

function AddFolderComponent() {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const onChangeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFolderName(e.target.value);
    },
    []
  );

  const onAddFolderHandler = useCallback(() => {
    if (folderName) {
      dispatch(addFolder(folderName));
    }
  }, [folderName, dispatch]);
  return (
    <div className="add-folder__container">
      <input type="text" onChange={onChangeInputHandler} />
      <button onClick={onAddFolderHandler}>Create a Folder</button>
    </div>
  );
}

export default AddFolderComponent;
