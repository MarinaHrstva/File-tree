import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../reducer/store";
import "./FilePreview.css";

export default function FilePreview() {
  const selectedFile = useSelector(
    (state: RootState) => state.fileTree.selectedFile
  );
  return (
    <div className="file-preview__container">
      {!selectedFile ? (
        <p>No file selected</p>
      ) : (
        <>
          <p className="file-name">{selectedFile.fileName}</p>
          <p className="file-body">{selectedFile.fileContent}</p>
        </>
      )}
    </div>
  );
}
