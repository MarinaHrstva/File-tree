import React, { useCallback, useEffect } from "react";
import FileTree from "../FileTree";
import { useDispatch } from "react-redux";
import { resetCredentials } from "../../reducer/credentialsSlice";
import { getFileTree } from "../../reducer/fileTreeSlice";
import { AppDispatch } from "../../reducer/store";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFileTree(""));
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

      <div>
        <FileTree />

        <div>
          <FileTree activeFolder />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
