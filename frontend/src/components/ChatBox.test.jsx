import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axois';
import ChatBox from './ChatBox';

/*
    things to test 
    - dependencies - API call 
    - messages added correctly 
    - sourceTag is being used correctly 
    - messages scrolls to bottom 
*/

// mocking axios -- testing API call 
jest.mock('axios'); 

describe ('ChatBox Component', () => {
    const sourceTag = 'testSourceTag'; 

    // dependencies - API call 
    it ("should handle API response and display AI message", async() => {
        const mockResponse = { data : {response: "Hi! How can I help you"}};
        axios.post.mockResolvedValueOnce(mockResponse);

        render (<Chatbot sourceTag={sourceTag} /> );
        const input = screen.getByPlaceholderText("Type your query and hit enter..."); 

        // simulate user message ('Hello') and Enter key pressed
        await userEvent.type(input, "Hello {enter}");

        expect(await screen.findByText("Hi! How can I help you")).toBeInTheDocument();
    });

<<<<<<< Updated upstream

    //TODO
    // check 'not relevant' message 

    // check API failure error message 
    
    

=======
>>>>>>> Stashed changes
    // messages added correctly 
    it ("should add the user message and clear the input when Enter key is pressed", async() => {
        render(<ChatBox sourceTag={sourceTag} />);
        const input = screen.getByPlaceholderText("Type your query and hit enter..."); 

        // simulate user message ('Hello') and Enter key pressed
        await userEvent.type(input, "Hello {enter}");

        expect(screen.getByText("Hello")).toBeInTheDocument(); // input to appear as message on screen
        expect(input).toHaveValue(""); // clear input 

    });

    // sourceTag is being used correctly 
    it ("should show initial message from on sourceTag", () => {
        render(<ChatBox sourceTag={sourceTag} />);
        expect(screen.getByText(sourceTag)).toBeInTheDocument();
    });

<<<<<<< Updated upstream

    //TODO
    // messages scrolls to bottom
    it("scrolls to the bottom when new message is added", async() => {


    });
=======
    //TODO
    // messages scrolls to bottom - can't figure out how to test LLM response to trigger scrollInView 
>>>>>>> Stashed changes
    

});