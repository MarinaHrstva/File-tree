import React, { useState } from "react";

import { addFile } from "../services/s3Service";

function FileUpload() {
  // const [uploadgInfo, setUploadInfo] = useState({
  //   loading: false,
  //   error: null,
  // });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    const file = e.target.files[0];

    try {
      await addFile(file);
      //TODO: UI notification for successfully added file
    } catch (error) {
      //TODO: Add Error Handling Logic
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
