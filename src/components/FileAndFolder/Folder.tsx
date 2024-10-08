import React, { FC, useCallback, useState } from "react";
import { FaChevronDown, FaChevronUp, FaFolder } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentPrefix } from "../../reducer/fileTreeSlice";
import DeleteItem from "../ActionsComponents/DeleteItem";
import { RootState } from "../../reducer/store";
import { FileTreeType } from "../../reducer/types";
import "./FileAndFolder.css";
import { getFileName } from "../../utils";

type Props = {
  folder: FileTreeType;
  margin?: number;
  isActiveFolder?: boolean;
};

const Folder: FC<Props> = ({ folder, margin = 8, isActiveFolder }) => {
  const dispatch = useDispatch();
  const currentPrefix = useSelector(
    (state: RootState) => state.fileTree.currentPrefix
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const folderName = (folder?.name && getFileName(folder.name)) || folder?.name;

  const handleFolderClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if ("subfolders" in folder && !folder.subfolders.length) {
        return;
      }
      setIsOpen((isOpen) => !isOpen);
    },
    [folder]
  );

  const handleFolderDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      dispatch(setCurrentPrefix(folder.name));
    },
    [dispatch, folder.name]
  );

  const additionalClassName = folder?.name === currentPrefix && "active-folder";

  return (
    <div
      key={folder.name}
      className="folder-item__container"
      onClick={(e) => handleFolderClick(e)}
      onDoubleClick={handleFolderDoubleClick}
      style={{
        marginLeft: margin,
      }}
    >
      <div className={`folder-item ${additionalClassName}`}>
        <FaFolder /> {folderName}
        {folder.type === "folder" && folder.subfolders.length ? (
          isOpen ? (
            <FaChevronDown />
          ) : (
            <FaChevronUp />
          )
        ) : null}
        <DeleteItem item={folder} />
      </div>
      {(isOpen &&
        folder.type === "folder" &&
        folder.subfolders.length &&
        folder.subfolders.map((subfolder) => (
          <Folder
            key={subfolder?.name}
            folder={subfolder}
            margin={isActiveFolder ? 0 : margin + 8}
          />
        ))) ||
        null}
    </div>
  );
};

export default Folder;
