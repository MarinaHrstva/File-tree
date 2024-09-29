import React, { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

import { deleteFileOrFolder, getFileTree } from "../../reducer/fileTreeThunks";
import { AppDispatch, RootState } from "../../reducer/store";
import { FileTreeType } from "../../reducer/types";
import { resetSelectedFile } from "../../reducer/fileTreeSlice";
import "./DeleteItem.css";

type Props = {
  item: FileTreeType;
};

const DeleteItem: FC<Props> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFile = useSelector(
    (state: RootState) => state.fileTree.selectedFile
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const userConfirmation = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (userConfirmation) {
        dispatch(deleteFileOrFolder({ key: item.name }));
        dispatch(getFileTree(""));
        if (selectedFile?.fileName === item.name) {
          dispatch(resetSelectedFile());
        }
      }
    },
    [dispatch, item.name, selectedFile?.fileName]
  );

  return (
    <div onClick={handleClick} className="delete-item__container">
      <FaTrash />
    </div>
  );
};

export default DeleteItem;
