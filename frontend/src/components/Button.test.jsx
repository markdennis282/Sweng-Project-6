import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {

    it("should render button with the correct text", () => {
        const buttonText = "Compliance Text";
        render(<Button text={buttonText} />);
        expect(screen.getByRole("button").textContent).toBe(buttonText);
    });

    it("should call onClick when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} text="Click Me" />);

        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

});
