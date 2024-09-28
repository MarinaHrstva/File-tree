import React, { useCallback } from "react";
import { FaTrash } from "react-icons/fa";

import { deleteFileOrFolder, getFileTree } from "../../reducer/fileTreeThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reducer/store";
import { FileTreeType } from "../../reducer/types";
import "./DeleteItem.css";

type Props = {
  item: FileTreeType;
};

function DeleteItem({ item }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const userConfirmation = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (userConfirmation) {
        dispatch(deleteFileOrFolder({ key: item.name }));
        dispatch(getFileTree(""));
      }
    },
    [dispatch, item.name]
  );

  return (
    <div onClick={handleClick} className="delete-item__container">
      <FaTrash />
    </div>
  );
}

export default DeleteItem;
