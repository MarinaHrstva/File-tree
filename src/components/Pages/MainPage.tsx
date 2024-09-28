import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { resetCredentials } from "../../reducer/credentialsSlice";
import ActiveFolder from "../ActiveFolder/ActiveFolder";
import { resetInitialState } from "../../reducer/fileTreeSlice";
import { AppDispatch, RootState } from "../../reducer/store";
import FolderTree from "../FolderTree/FolderTree";
import {
  getActiveFolderContent,
  getFileTree,
} from "../../reducer/fileTreeThunks";
import "./MainPage.css";

function MainPage() {
  const error = useSelector((state: RootState) => state.fileTree.error);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFileTree(""));
    dispatch(getActiveFolderContent(""));
  }, [dispatch]);

  const onLogoutHandler = useCallback(() => {
    dispatch(resetCredentials());
    dispatch(resetInitialState());
  }, [dispatch]);

  if (error) {
    return <p>{error}</p>;
  }

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
