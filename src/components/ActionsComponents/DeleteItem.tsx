import React, { useCallback, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteFileOrFolder, FileTreeType } from "../../reducer/fileTreeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reducer/store";

type Props = {
  item: FileTreeType;
};

function DeleteItem({ item }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [shouldDelete, setShouldDelete] = useState<boolean>(false);

  useEffect(() => {
    if (shouldDelete) {
      dispatch(deleteFileOrFolder({ key: item.name }));
      setShouldDelete(false);
    }
  }, [dispatch, item, shouldDelete]);

  const handleClick = useCallback(() => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmation) {
      setShouldDelete(true);
    }
  }, []);

  return (
    <div onClick={handleClick}>
      <FaTrash />
    </div>
  );
}

export default DeleteItem;
