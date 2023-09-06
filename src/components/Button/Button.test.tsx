import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Given a Button component", () => {
  describe("When it receives a text 'Pending'", () => {
    test("Then it should show the text 'Pending'", () => {
      const buttonText = "Pending";
      const actionOnClick = vi.fn();

      render(
        <Button className="active button" actionOnClick={actionOnClick}>
          Pending
        </Button>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When it receives an actionOnClick function and the button is clicked", () => {
    test("Then the funciont actionOnClick should be called", async () => {
      const buttonText = "Pending";
      const actionOnClick = vi.fn();

      render(
        <Button className="active button" actionOnClick={actionOnClick}>
          Pending
        </Button>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      await userEvent.click(button);

      expect(actionOnClick).toHaveBeenCalled();
    });
  });
});
