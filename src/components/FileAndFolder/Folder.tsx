import React, { useCallback, useState } from "react";
import { FileTreeType, setCurrentPrefix } from "../../reducer/fileTreeSlice";
import { FaChevronDown, FaChevronUp, FaFolder } from "react-icons/fa";
import { useDispatch } from "react-redux";

import "./FileAndFolder.css";
import DeleteItem from "../ActionsComponents/DeleteItem";

type Props = {
  folder: FileTreeType;
  margin?: number;
};

function Folder({ folder, margin = 0 }: Props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const folderName =
    folder?.name
      .split("/")
      .filter((f) => !!f)
      .pop() || folder?.name;

  const handleFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if ("subfolders" in folder && !folder.subfolders.length) {
      return;
    }
    setIsOpen((isOpen) => !isOpen);
  };

  const handleFolderDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      dispatch(setCurrentPrefix(folder.name));
    },
    [dispatch, folder.name]
  );

  return (
    <div
      className="folder-item__container"
      onClick={(e) => handleFolderClick(e)}
      onDoubleClick={handleFolderDoubleClick}
      style={{
        marginLeft: margin,
      }}
    >
      <p className="folder-item">
        <FaFolder /> {folderName}
        {folder.type === "folder" && folder.subfolders.length ? (
          isOpen ? (
            <FaChevronDown />
          ) : (
            <FaChevronUp />
          )
        ) : null}
        <DeleteItem item={folder} />
      </p>
      {(isOpen &&
        folder.type === "folder" &&
        folder.subfolders.length &&
        folder.subfolders.map((subfolder) => (
          <Folder
            key={subfolder?.name}
            folder={subfolder}
            margin={margin + 8}
          />
        ))) ||
        null}
    </div>
  );
}

export default Folder;
