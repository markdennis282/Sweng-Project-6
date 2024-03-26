import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axois';
import Layout from './Layout'
import styles from './Layout.module.css';

describes ("Layout Components", () => {

    //parent component has all children component 
    it ("should render menu component with its children", () => {
        const { getByText } = render (
            <Layout menuComponent={<div>Menu Component</div>} children={<div>Main Component</div>}/> 
            );

        expect(getByText("Menu Component")).toBeInTheDocument();
        expect(getByText("Main Component")).toBeInTheDocument();
    });

    // menu initially hidden
    it ("should initially hide menu until button clicked", () => {
        render(<Layout menuComponent={<div>Menu Component</div>} children={<div>Main Component</div>}/>);

        const menu = screen.getByText("Menu Component").parentNode; 
        expect(menu).not.toHaveClass(styles.menuOpen);
    });

    // button click -> menu shown/hides 
    it ("should toggle is menu shown/hidden", () => {
        render(<Layout menuComponent={<div>Menu Component</div>} children={<div>Main Component</div>}/>);

        const toggleBtn = screen.getByrole("button"); 
        const menu = screen.getByText("Main Component").parentNode;

        // 1st click click: should open menu
        userEvent.click(toggleBtn);
        expect(menu).toHaveClass(styles.menuOpen); 

        // 2nd click: should hide menu 
        userEvent.click(toggleBtn);
        expect(menu).not.toHaveClass(styles.menuOpen);

        // 3rd click: shoulc reopen the closed menu 
        userEvent.click(toggleBtn);
        expect(menu).toHaveClass(styles.menuOpen); 
    });

});