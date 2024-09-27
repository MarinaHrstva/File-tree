import React, { useCallback } from "react";
import { FaFile } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../reducer/store";
import { FileTreeType, getFile } from "../../reducer/fileTreeSlice";
import "./FileAndFolder.css";
import DeleteItem from "../ActionsComponents/DeleteItem";
import { getFileName } from "../../utils";

type Props = {
  name: string;
};

function File({ name }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const fileClickHandler = useCallback(() => {
    dispatch(getFile(name));
  }, [dispatch, name]);

  const fileName = getFileName(name);

  return (
    <div className="file-item__container" onClick={fileClickHandler}>
      <div className="file-item">
        <p>
          <FaFile />
          {fileName}
        </p>
        <DeleteItem item={{ name } as FileTreeType} />
      </div>
    </div>
  );
}

export default File;
