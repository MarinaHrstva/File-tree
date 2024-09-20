import React, { useEffect, useState } from "react";
import "./App.css";
import { getFiles } from "./services/s3Service";

function App() {
  const [files, setFiles] = useState<AWS.S3.ObjectList>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const fileList = await getFiles();
      if (fileList) {
        setFiles(fileList);
      }
    };

    fetchFiles();
  }, []);
  console.log(files);
  return <div className="App">It works</div>;
}

export default App;
