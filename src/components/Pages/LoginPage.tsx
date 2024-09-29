import React, { FC } from "react";

import LoginForm from "../LoginForm/LoginForm";
import "./LoginPage.css";

const LoginPage: FC = () => {
  return (
    <div className="view-container login-page-wrapper">
      <h2>
        Welcome to your <h1>File tree</h1>
      </h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
