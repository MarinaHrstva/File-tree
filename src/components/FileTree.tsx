import React from "react";
import FileUpload from "./FileUpload";
import FilePreview from "./FilePreview";

type Props = {
  activeFolder?: boolean;
};

function FileTree({ activeFolder }: Props): JSX.Element {
  return (
    <div>
      FileTree
      {activeFolder && (
        <div className="actions-container">
          <FileUpload />
          <button>Create a Folder</button>
          <FilePreview />
        </div>
      )}
    </div>
  );
}

export default FileTree;
