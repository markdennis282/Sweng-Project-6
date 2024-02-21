// NavBar.jsx
import "./NavBar.css";
import Button from "./Button.jsx";
import { useState } from "react";
import PropTypes from "prop-types";

function NavBar({ onButtonClick }) {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const buttons = ["ALL", "COMPLIANCE", "HR", "TECH"];

    const handleClick = index => {
        setSelectedIndex(index);
        onButtonClick(buttons[index]);
        // console.log(buttons[index]);
    };

    return (
        <>
            <div className="navbar">
                {
                    buttons.map((title, index) =>
                        <Button
                            key={index}
                            status={index === selectedIndex ? "selected" : ""}
                            name="navButton right"
                            title={title}
                            onClick={() => {
                                handleClick(index);
                            }}
                        />
                    )
                }
            </div>
        </>
    );
}

NavBar.propTypes = {
    onButtonClick: PropTypes.func
};

export default NavBar;
