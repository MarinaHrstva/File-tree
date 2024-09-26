import React, { useState } from "react";
import { FileTreeType } from "../../reducer/fileTreeSlice";
import { FaChevronDown, FaChevronUp, FaFolder } from "react-icons/fa";

import "./FileAndFolder.css";

type Props = {
  folder: FileTreeType;
  onDoubleClick?: (fileTreeItem: FileTreeType) => void;
};

function Folder({ folder, onDoubleClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const folderName =
    folder.name
      .split("/")
      .filter((f) => !!f)
      .pop() || folder.name;

  const handleFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="folder-item__container"
      onClick={(e) => handleFolderClick(e)}
      onDoubleClick={() => onDoubleClick && onDoubleClick(folder)}
    >
      <p className="folder-item">
        <FaFolder /> {folderName} {isOpen ? <FaChevronDown /> : <FaChevronUp />}
      </p>
      {isOpen &&
        folder.type === "folder" &&
        folder.subfolders.map((subfolder) => (
          <Folder
            key={subfolder.name}
            folder={subfolder}
            onDoubleClick={onDoubleClick}
          />
        ))}
    </div>
  );
}

export default Folder;
