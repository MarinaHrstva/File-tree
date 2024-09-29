import React from "react";
import { render, screen } from "@testing-library/react";
import InputError from "./InputError";

describe("InputError", () => {
  it("renders InputError component", () => {
    render(<InputError />);
    
    expect(screen.getByText("The input value is required")).toBeInTheDocument();
    expect(screen.getByText("The input value is required")).toHaveClass(
      "error-message"
    );
  });
});
