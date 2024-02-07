// NavBar.jsx
import "./NavBar.css";
import Button from "./Button.jsx";
import { useState } from "react";

function NavBar() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const buttons = ["ALL", "COMPLIANCE", "HR", "TECH"];

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
                                setSelectedIndex(index);
                            }}
                        />
                    )
                }
            </div>
        </>
    );
}

export default NavBar;
