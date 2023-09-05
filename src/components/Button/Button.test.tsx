import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it receives a text 'Pending'", () => {
    test("Then it should show the text 'Pending'", () => {
      const buttonText = "Pending";

      render(<Button isActive={true} isCardButton={false} text={buttonText} />);

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});
