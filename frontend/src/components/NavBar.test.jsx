import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NavBar from './NavBar';

describe ("NavBar Component", () => {
    // correctly renders 
    it ("renders correctly", () => {
        render(<NavBar/>); 
        expect(screen.getByText("Home")).toBeInTheDocument();
    })
    
});
