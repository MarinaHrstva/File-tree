import React from "react";

type Props = {
  name: string;
};

function File({ name }: Props) {
  return (
    <div>
      <i></i>
      <p>{name}</p>
    </div>
  );
}

export default File;
