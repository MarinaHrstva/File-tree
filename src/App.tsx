import React, { useEffect } from "react";
import { Provider } from "react-redux";

import "./App.css";
import { getFiles } from "./services/s3Service";
import store from "./reducer/store";
import LoginForm from "./components/LoginForm";
import LoginPage from "./components/Pages/LoginPage";

export type FileFolderType = {
  name: string;
  type: string;
};

function App() {
  useEffect(() => {
    const fetchFiles = async () => {
      await getFiles();
    };

    fetchFiles();
  }, []);

  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
}

export default App;
