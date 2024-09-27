import React, { useCallback, useState } from "react";
import { FileTreeType, setCurrentPrefix } from "../../reducer/fileTreeSlice";
import { FaChevronDown, FaChevronUp, FaFolder } from "react-icons/fa";
import { useDispatch } from "react-redux";

import "./FileAndFolder.css";
import DeleteItem from "../ActionsComponents/DeleteItem";

type Props = {
  folder: FileTreeType;
};

function Folder({ folder }: Props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);

  const folderName =
    folder?.name
      .split("/")
      .filter((f) => !!f)
      .pop() || folder?.name;

  const handleFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClicks((prev) => prev + 1);
    setTimeout(() => {
      if (clicks === 1) {
        if ("subfolders" in folder && !folder.subfolders.length) {
          return;
        }
        setIsOpen(!isOpen);
      }
      setClicks(0);
    }, 300);
  };

  const handleFolderDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (clicks >= 2) {
        dispatch(setCurrentPrefix(folder.name));
        setIsOpen(!isOpen);
      }
    },
    [clicks, dispatch, folder.name]
  );

  return (
    <div
      className="folder-item__container"
      onClick={(e) => handleFolderClick(e)}
      onDoubleClick={handleFolderDoubleClick}
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
          <Folder key={subfolder?.name} folder={subfolder} />
        ))) ||
        null}
    </div>
  );
}

export default Folder;
