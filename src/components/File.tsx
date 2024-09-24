import React from "react";
import { FileFolderType } from "../App";

function File({ name }: FileFolderType) {
  return (
    <div>
      <i></i>
      <p>{name}</p>
    </div>
  );
}

export default File;
