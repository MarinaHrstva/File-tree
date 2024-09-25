import React, { useCallback, useEffect } from "react";
import ActiveFolder from "../ActiveFolder";
import { useDispatch } from "react-redux";

import { resetCredentials } from "../../reducer/credentialsSlice";
import {
  getActiveFolderContent,
  getFileTree,
} from "../../reducer/fileTreeSlice";
import { AppDispatch } from "../../reducer/store";
import FolderTree from "../FolderTree";
import "./MainPageStyles.css";

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
    <div>
      <header>
        <h1>File tree</h1>
        <button onClick={onLogoutHandler}>Log out</button>
      </header>
      <div className="view-wrapper">
        <FolderTree />
        <div>
          <ActiveFolder />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
