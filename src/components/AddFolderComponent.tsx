import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducer/store";
import { addFolder } from "../reducer/fileTreeSlice";

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
    <div>
      <input type="text" onChange={onChangeInputHandler} />
      <button onClick={onAddFolderHandler}>Create a Folder</button>
    </div>
  );
}

export default AddFolderComponent;
