import React, { useEffect } from "react";

import "./App.css";
import { getFiles } from "./services/s3Service";
import { RootState } from "./reducer/store";
import LoginPage from "./components/Pages/LoginPage";
import { useSelector } from "react-redux";
import MainPage from "./components/Pages/MainPage";

export type FileFolderType = {
  name: string;
  type: string;
};

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.credentials.isLoggedIn
  );

  useEffect(() => {
    const fetchFiles = async () => {
      await getFiles();
    };

    fetchFiles();
  }, []);

  return <div>{isLoggedIn ? <MainPage /> : <LoginPage />}</div>;
}

export default App;
