import React, { useCallback, useState } from "react";
import { FileTreeType, setCurrentPrefix } from "../../reducer/fileTreeSlice";
import { FaChevronDown, FaChevronUp, FaFolder } from "react-icons/fa";
import { useDispatch } from "react-redux";

import "./FileAndFolder.css";
import DeleteItem from "../ActionsComponents/DeleteItem";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer/store";

type Props = {
  folder: FileTreeType;
  margin?: number;
};

function Folder({ folder, margin = 0 }: Props) {
  const dispatch = useDispatch();
  const currentPrefix = useSelector(
    (state: RootState) => state.fileTree.currentPrefix
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const folderName =
    folder?.name
      .split("/")
      .filter((f) => !!f)
      .pop() || folder?.name;

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
            margin={margin + 8}
          />
        ))) ||
        null}
    </div>
  );
}

export default Folder;
