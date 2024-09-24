import React from "react";
import { FileFolderType } from "../App";

function Folder({ name }: FileFolderType) {
  return (
    <div>
      <i></i>
      <p>{name}</p>
    </div>
  );
}

export default Folder;
