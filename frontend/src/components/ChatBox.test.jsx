import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ChatBox from "./ChatBox";
import * as ApiAccess from "../utils/apiAccess";

/*
    things to test
    - dependencies - API call
    - messages added correctly
    - sourceTag is being used correctly
    - messages scrolls to bottom
*/

Element.prototype.scrollIntoView = jest.fn();

jest.mock("../utils/apiAccess");

describe("ChatBox Component", () => {
    const sourceTag = "testSourceTag";

    // dependencies - API call
    it("should handle API response and display AI message", async () => {
        const getChatStreamResponseSpy = jest.spyOn(ApiAccess, "getChatStreamResponse");

        render(<ChatBox sourceTag={sourceTag} />);
        const input = screen.getByPlaceholderText("Type your query and hit enter...");

        // simulate user message ('Hello') and Enter key pressed
        await userEvent.type(input, "Hello {enter}");

        expect(getChatStreamResponseSpy).toHaveBeenCalledTimes(1);

        expect(await screen.findByText(/Final response/)).toBeInTheDocument();
    });

    // messages added correctly
    it("should add the user message and clear the input when Enter key is pressed", async () => {
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
        expect(screen.getByText(new RegExp(sourceTag))).toBeInTheDocument();
    });

    // TODO
    // messages scrolls to bottom - can't figure out how to test LLM response to trigger scrollInView

});
