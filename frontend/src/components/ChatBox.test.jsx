import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import ChatBox from "./ChatBox";

/*
    things to test
    - dependencies - API call
    - messages added correctly
    - sourceTag is being used correctly
    - messages scrolls to bottom
*/

Element.prototype.scrollIntoView = jest.fn();

jest.mock("axios");
jest.mock("../utils/apiAccess");

describe("ChatBox Component", () => {
    const sourceTag = "testSourceTag";

    // dependencies - API call
    it("should handle API response and display AI message", async () => {
        const mockResponse = { data: { response: "Hi! How can I help you" } };
        axios.post.mockResolvedValueOnce(mockResponse);

        render(<ChatBox sourceTag={sourceTag} />);
        const input = screen.getByPlaceholderText("Type your query and hit enter...");

        // simulate user message ('Hello') and Enter key pressed
        await userEvent.type(input, "Hello {enter}");

        expect(await screen.findByText("Hi! How can I help you")).toBeInTheDocument();
    });

    // messages added correctly
    it("should add the user message and clear the input when Enter key is pressed", async () => {
        const mockResponse = { data: { response: "Hi! How can I help you" } };
        axios.post.mockResolvedValueOnce(mockResponse);

        render(<ChatBox sourceTag={sourceTag} />);
        const input = screen.getByPlaceholderText("Type your query and hit enter...");

        // simulate user message ('Hello') and Enter key pressed
        await userEvent.type(input, "Hello {enter}");

        expect(screen.getByText("Hello")).toBeInTheDocument(); // input to appear as message on screen
        expect(input).toHaveValue(""); // clear input

    });

    // sourceTag is being used correctly
    it("should show initial message from on sourceTag", () => {
        render(<ChatBox sourceTag={sourceTag} />);
        expect(screen.getByText(sourceTag)).toBeInTheDocument();
    });

    // TODO
    // messages scrolls to bottom - can't figure out how to test LLM response to trigger scrollInView

});
