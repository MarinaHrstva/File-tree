import React, { useState } from "react";
import {
  CredentialsStateType,
  setCredentials,
} from "../../reducer/credentialsSlice";
import { useDispatch } from "react-redux";

import "./LoginForm.css";

function LoginForm(): JSX.Element {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<
    Omit<CredentialsStateType, "isLoggedIn" | "region">
  >({
    accessKeyId: "",
    secretKey: "",
    bucketName: "",
  });

  function onSubmitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    //TODO Add form validation
    dispatch(setCredentials(formData));
  }

  function onCancelHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFormData({
      accessKeyId: "",
      secretKey: "",
      bucketName: "",
    });
  }

  function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <form action="#" className="login-form">
      <div className="input-container">
        <label htmlFor="Access key Id">Access key Id</label>
        <input
          type="text"
          placeholder="Access key Id"
          name="accessKeyId"
          value={formData.accessKeyId}
          onChange={onChangeInputHandler}
        />
      </div>
      <div className="input-container">
        <label htmlFor="Secret access key">Secret access key</label>
        <input
          type="text"
          placeholder="Secret access key"
          name="secretKey"
          value={formData.secretKey}
          onChange={onChangeInputHandler}
        />
      </div>
      <div className="input-container">
        <label htmlFor="Bucket name">Bucket name</label>
        <input
          type="text"
          placeholder="Bucket name"
          name="bucketName"
          value={formData.bucketName}
          onChange={onChangeInputHandler}
        />
      </div>
      <div className="btn-container">
        <button onClick={onCancelHandler}>Cancel</button>
        <button onClick={onSubmitHandler}>Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;
