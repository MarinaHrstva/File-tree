import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/store";

export default function FilePreview() {
  const selectedFile = useSelector(
    (state: RootState) => state.fileTree.selectedFile
  );
  return (
    <div>
      {!selectedFile ? (
        <p>No file selected</p>
      ) : (
        <>
          <p>{selectedFile.fileName}</p>
          <p>{selectedFile.fileContent}</p>
        </>
      )}
    </div>
  );
}
