import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../reducer/store";
import { addFile } from "../../reducer/fileTreeThunks";
import "./FileUpload.css";
import InputError from "../common/InputError";

function FileUpload() {
  const dispatch = useDispatch<AppDispatch>();
  const currentPrefix = useSelector(
    (state: RootState) => state.fileTree.currentPrefix
  );
  const [newFile, setNewFile] = useState({ fileName: "", fileContent: "" });
  const [error, setError] = useState<{
    fileName: boolean;
    fileContent: boolean;
  }>({
    fileName: false,
    fileContent: false,
  });

  const fileInputValue = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(() => {
    const file = fileInputValue.current?.files?.[0];
    if (!file) {
      return;
    }
    dispatch(addFile({ file: file, prefix: currentPrefix }));
  }, [dispatch, currentPrefix]);

  const handleAddFile = useCallback(() => {
    const errorsCopy = { ...error };
    Object.keys(newFile).forEach((key) => {
      if (!newFile[key as keyof typeof newFile]) {
        errorsCopy[key as keyof typeof newFile] = true;
      } else {
        errorsCopy[key as keyof typeof newFile] = false;
      }
    });

    setError(errorsCopy);
    if (Object.values(errorsCopy).some((v) => !!v)) {
      return;
    }

    const file = new File([newFile.fileContent], `${newFile.fileName}.txt`, {
      type: "text/plain",
    });

    dispatch(addFile({ file, prefix: currentPrefix }));
  }, [currentPrefix, dispatch, error, newFile]);

  const handleNewFileInputsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewFile((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  return (
    <div className="create-file__container">
      <div className="input-container create-file-item">
        <label htmlFor="fileName">File Name</label>
        <input
          type="text"
          name="fileName"
          onChange={handleNewFileInputsChange}
        />
        {error.fileName && <InputError />}
        <label htmlFor="fileContent"> Create New File</label>
        <textarea
          name="fileContent"
          id="createFile"
          onChange={handleNewFileInputsChange}
        />
        {error.fileContent && <InputError />}
        <button onClick={handleAddFile}>Add File</button>
      </div>
      <div className="input-container create-file-item">
        <label htmlFor="fileUpload">Upload Existing File</label>
        <input
          type="file"
          accept=".txt"
          name="fileUpload"
          ref={fileInputValue}
        />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
    </div>
  );
}

export default FileUpload;
