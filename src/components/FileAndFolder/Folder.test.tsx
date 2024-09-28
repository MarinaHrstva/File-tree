/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/await-async-query */
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import Folder from "./Folder";
import store from "../../reducer/store";
import { FileTreeType } from "../../reducer/types";

describe("Folder Component", () => {
  test("should display correct folder name", () => {
    const folder = {
      name: "testFolder",
      type: "folder",
      subfolders: [],
      isOpen: false,
    };

    const { getByText } = render(
      <Provider store={store}>
        <Folder folder={folder as FileTreeType} />
      </Provider>
    );

    expect(getByText(folder.name)).toBeInTheDocument();
  });
});
