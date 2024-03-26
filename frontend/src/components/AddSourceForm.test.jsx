import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AddSourceForm from './AddSourceForm';

// Mock axios 
jest.mock('axios');

describe ("AddSourceForm Component", () => {

    it ("should display a form with inputs, select buttons and a submit button", () => {

        render (<AddSourceForm/>);
        expect(screen.getByLabelText(/source url/i)).toBeInTheDocument(); // "/i": ignoreCase
        expect(screen.getByLabelText(/access control/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/refresh interval/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /submit/i} )).toBeInTheDocument();

    });

    // pressing submit button prematurely should log error in console
    it ("checks if error is logged in console when submit fails", async() => {
        render (<AddSourceForm/>);

        // mock error for API post 
        axios.post.mockRejectedValue(new Error("API request failed"));

        // mock console error logged 
        const mockConsoleError = jest.spyOn(console, "error").mockImplementation();
        
        // user submit empty form 
        userEvent.click(screen.getByRole('button', {name: /submit/i}));
        await waitFor(() => expect(mockConsoleError).toHaveBeenCalledWith(expect.any(Error)));
        
        mockConsoleError.mockRestore(); // resore console error
    });
});