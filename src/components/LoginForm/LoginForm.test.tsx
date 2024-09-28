/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../reducer/store";
import LoginForm from "./LoginForm";

describe("App", () => {
  test("update on change", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Access key Id"), {
      target: { value: "testAccessKey" },
    });

    fireEvent.change(getByPlaceholderText("Secret access key"), {
      target: { value: "testSecretKey" },
    });

    fireEvent.change(getByPlaceholderText("Bucket name"), {
      target: { value: "testBucketName" },
    });

    fireEvent.change(getByPlaceholderText("Access key Id"), {
      target: { value: "testAccessKey" },
    });

    fireEvent.change(getByPlaceholderText("Secret access key"), {
      target: { value: "testSecretKey" },
    });

    fireEvent.change(getByPlaceholderText("Bucket name"), {
      target: { value: "testBucketName" },
    });

    expect(
      (getByPlaceholderText("Access key Id") as HTMLInputElement).value
    ).toBe("testAccessKey");
    expect(
      (getByPlaceholderText("Secret access key") as HTMLInputElement).value
    ).toBe("testSecretKey");
    expect(
      (getByPlaceholderText("Bucket name") as HTMLInputElement).value
    ).toBe("testBucketName");
  });

  test("cancel button click", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Access key Id"), {
      target: { value: "testAccessKey" },
    });

    fireEvent.click(getByText("Cancel"));

    expect(
      (getByPlaceholderText("Access key Id") as HTMLInputElement).value
    ).toBe("");
  });

  test("errors shown on empty inputs", () => {
    const { getByText, queryAllByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.click(getByText("Submit"));

    const errorMessages = queryAllByText("The input value is required");

    expect(errorMessages).toHaveLength(3);
  });
});
