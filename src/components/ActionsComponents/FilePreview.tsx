import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../reducer/store";
import { getFileName } from "../../utils";
import "./FilePreview.css";

export default function FilePreview() {
  const selectedFile = useSelector(
    (state: RootState) => state.fileTree.selectedFile
  );
  const fileName = selectedFile && getFileName(selectedFile.fileName);

  return (
    <div className="file-preview__container">
      {!selectedFile ? (
        <p>No file selected</p>
      ) : (
        <>
          <p className="file-name">{fileName}</p>
          <p className="file-body">{selectedFile.fileContent}</p>
        </>
      )}
    </div>
  );
}
