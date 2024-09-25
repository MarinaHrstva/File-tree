import React from "react";

import "./App.css";
import { RootState } from "./reducer/store";
import LoginPage from "./components/Pages/LoginPage";
import { useSelector } from "react-redux";
import MainPage from "./components/Pages/MainPage";

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.credentials.isLoggedIn
  );

  return <div>{isLoggedIn ? <MainPage /> : <LoginPage />}</div>;
}

export default App;
