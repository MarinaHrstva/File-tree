import React, { useCallback } from "react";
import { FaFile } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducer/store";
import { getFile } from "../reducer/fileTreeSlice";

type Props = {
  name: string;
};

function File({ name }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const fileClickHandler = useCallback(() => {
    dispatch(getFile(name));
  }, [dispatch, name]);

  const fileName =
    name
      .split("/")
      .filter((f) => !!f)
      .pop() || name;

  return (
    <div onClick={fileClickHandler}>
      <FaFile />
      {fileName}
    </div>
  );
}

export default File;
