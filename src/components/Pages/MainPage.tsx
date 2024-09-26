import React, { useCallback, useEffect } from "react";
import ActiveFolder from "../ActiveFolder/ActiveFolder";
import { useDispatch } from "react-redux";

import { resetCredentials } from "../../reducer/credentialsSlice";
import {
  getActiveFolderContent,
  getFileTree,
} from "../../reducer/fileTreeSlice";
import { AppDispatch } from "../../reducer/store";
import FolderTree from "../FolderTree/FolderTree";
import "./MainPage.css";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFileTree(""));
    dispatch(getActiveFolderContent(""));
  }, [dispatch]);

  const onLogoutHandler = useCallback(() => {
    dispatch(resetCredentials());
  }, [dispatch]);

  return (
    <div className="view-container main-page-wrapper">
      <header>
        <h1>File tree</h1>
        <button onClick={onLogoutHandler}>Log out</button>
      </header>
      <div className="file-tree-view-wrapper">
        <FolderTree />
        <ActiveFolder />
      </div>
    </div>
  );
}

export default MainPage;
