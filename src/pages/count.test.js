import Count from "./count";
import { screen, render } from "@testing-library/react";

describe("Count component", () => {
  test('First paragraph is "Count baby kicks!"', () => {
    render(<Count />);
    const paragraph = screen.getByText("Count baby kicks!");

    expect(paragraph).toBeInTheDocument();
  });
});
