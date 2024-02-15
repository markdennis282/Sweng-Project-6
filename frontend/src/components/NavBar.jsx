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
        console.log(buttons[index]);
    };

    const buttonStyle = {
        height: "50px",
        width: "140px",
        margin: "auto"
    };

    return (
        <>
            <div className="navbar">
                {
                    buttons.map((title, index) =>
                        <Button
                            key={index}
                            style={buttonStyle}
                            // status={index === selectedIndex ? "selected" : ""}
                            // name="navButton right"
                            text={title}
                            highlighted={index === selectedIndex}
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
