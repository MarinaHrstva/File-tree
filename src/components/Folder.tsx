import React, { useState } from "react";
import { FileTreeType } from "../reducer/fileTreeSlice";

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
    // onClick && onClick(folder);
  };

  return (
    <div>
      <div
        onClick={() => handleFolderClick(folder)}
        onDoubleClick={() => onDoubleClick && onDoubleClick(folder)}
      >
        {folderName}
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
