import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../reducer/store";
import { addFolder, getFileTree } from "../../reducer/fileTreeThunks";
import "./AddFolderComponent.css";
import InputError from "../common/InputError";

function AddFolderComponent() {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const onChangeInputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFolderName(e.target.value);
    },
    []
  );

  const onAddFolderHandler = useCallback(() => {
    if (folderName) {
      setError(false);
      dispatch(addFolder(folderName));
      dispatch(getFileTree(""));
    } else setError(true);
  }, [folderName, dispatch]);
  return (
    <div className="add-folder__container">
      <div>
        <input type="text" onChange={onChangeInputHandler} />
        {error && <InputError />}
      </div>
      <button onClick={onAddFolderHandler}>Create a Folder</button>
    </div>
  );
}

export default AddFolderComponent;
