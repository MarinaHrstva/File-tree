/* eslint-disable testing-library/prefer-screen-queries */
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import FolderTree from "./FolderTree";
import store from "../../reducer/store";

describe("FolderTree", () => {
  test("Renders successfully", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FolderTree />
      </Provider>
    );

    expect(getByText("Main Folder")).toBeInTheDocument();
  });

  test("handleMainFolderDoubleClick", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FolderTree />
      </Provider>
    );

    fireEvent.doubleClick(getByText("Main Folder"));
    const currentPrefix = store.getState().fileTree.currentPrefix;

    expect(currentPrefix).toBe("");
  });
});
