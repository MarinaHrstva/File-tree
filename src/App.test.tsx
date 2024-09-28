/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./reducer/store";

describe("App", () => {
  it("renders MainPage when user is logged in", () => {
    store.dispatch({ type: "setCredentials", payload: { isLoggedIn: true } });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("File tree")).toBeInTheDocument();
  });

  it("renders MainPage when user is not logged in", () => {
    store.dispatch({ type: "setCredentials", payload: { isLoggedIn: false } });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("Welcome to your")).toBeInTheDocument();
  });
});
