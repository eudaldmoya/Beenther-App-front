import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it receives a text 'Pending'", () => {
    test("Then it should show the text 'Pending'", () => {
      const buttonText = "Pending";
      const actionOnClick = vi.fn();

      render(
        <Button
          isActive={false}
          isCardButton={true}
          text={buttonText}
          actionOnClick={actionOnClick}
        />,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});
