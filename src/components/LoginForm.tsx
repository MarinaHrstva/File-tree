import React, { useState } from "react";
import {
  CredentialsStateType,
  setCredentials,
} from "../reducer/credentialsSlice";
import { useDispatch } from "react-redux";

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
    //TODO Add orm validation
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
    <div>
      <form action="#">
        <div>
          <label htmlFor="Access key Id">Access key Id</label>
          <input
            type="text"
            placeholder="Access key Id"
            name="accessKeyId"
            value={formData.accessKeyId}
            onChange={onChangeInputHandler}
          />
        </div>
        <div>
          <label htmlFor="Secret access key">Secret access key</label>
          <input
            type="text"
            placeholder="Secret access key"
            name="secretKey"
            value={formData.secretKey}
            onChange={onChangeInputHandler}
          />
        </div>
        <div>
          <label htmlFor="Bucket name">Bucket name</label>
          <input
            type="text"
            placeholder="Bucket name"
            name="bucketName"
            value={formData.bucketName}
            onChange={onChangeInputHandler}
          />
        </div>
        <div>
          <button onClick={onCancelHandler}>Cancel</button>
          <button onClick={onSubmitHandler}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
