import { render, screen, fireEvent } from "@testing-library/react";
import Button from './Button'; 

deacribe ("Button Component", () => {

    // button shows correct text 
    it ("renders button with the correct text", () => {
        const buttonText = "Compliance Text"; 
        render(<Button>{buttonText}</Button>);
        expect(screen.getByRole("button")).toHaveTextContent(buttonText); 

    })

    // calls onClick when clicked 
    it ("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);

        fireEvent.click(screen.getByRole("button")); 
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});