import React, { useState } from "react";
import { FileTreeType } from "../reducer/fileTreeSlice";
import { FaChevronDown, FaChevronUp, FaFolder } from "react-icons/fa";

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

  const handleFolderClick = (folder: FileTreeType) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={() => handleFolderClick(folder)}
        onDoubleClick={() => onDoubleClick && onDoubleClick(folder)}
      >
        <FaFolder /> {folderName} {isOpen ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      {isOpen &&
        folder.type === "folder" &&
        folder.subfolders.map((subfolder) => (
          <div>
            <Folder
              key={subfolder.name}
              folder={subfolder}
              onDoubleClick={onDoubleClick}
            />
          </div>
        ))}
    </div>
  );
}

export default Folder;
