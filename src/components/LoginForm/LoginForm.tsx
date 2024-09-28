import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  CredentialsStateType,
  setCredentials,
} from "../../reducer/credentialsSlice";
import "./LoginForm.css";
import InputError from "../common/InputError";

function LoginForm(): JSX.Element {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<
    Omit<CredentialsStateType, "isLoggedIn" | "region">
  >({
    accessKeyId: "",
    secretKey: "",
    bucketName: "",
  });

  const [errors, setErrors] = useState<{
    accessKeyId: boolean;
    secretKey: boolean;
    bucketName: boolean;
  }>({
    accessKeyId: false,
    secretKey: false,
    bucketName: false,
  });

  function onSubmitHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const errorsCopy = { ...errors };
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        errorsCopy[key as keyof typeof formData] = true;
      } else {
        errorsCopy[key as keyof typeof formData] = false;
      }
    });
    setErrors(errorsCopy);
    if (Object.values(errorsCopy).some((v) => !!v)) {
      return;
    }
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
        {errors.accessKeyId && <InputError />}
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
        {errors.secretKey && <InputError />}
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
        {errors.bucketName && <InputError />}
      </div>
      <div className="btn-container">
        <button onClick={onCancelHandler}>Cancel</button>
        <button onClick={onSubmitHandler}>Submit</button>
      </div>
    </form>
  );
}

export default LoginForm;
