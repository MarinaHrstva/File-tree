import React, { useCallback } from "react";
import { FaFile } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../reducer/store";
import { getFile } from "../../reducer/fileTreeThunks";
import "./FileAndFolder.css";
import DeleteItem from "../ActionsComponents/DeleteItem";
import { getFileName } from "../../utils";
import { FileTreeType } from "../../reducer/types";

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
    <div className="file-item__container" onClick={fileClickHandler} key={name}>
      <div className="file-item">
        <div>
          <FaFile />
          {fileName}
        </div>
        <DeleteItem item={{ name } as FileTreeType} />
      </div>
    </div>
  );
}

export default File;
