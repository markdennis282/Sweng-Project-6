// SideBar.jsx
import Button from "./Button";
import "./Button.css";
import "./SideBar.css";

import { useState } from "react";
import axios from "axios";

function SideBar() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        // console.log(formDataObject);

        try {
            await axios.post("http://localhost:8000/source", formDataObject);
        } catch(error) {
            // console.error("ERROR", error);
        }

    };

    return (
        <>
            { !open ?
                <Button name="navButton left" title="ADD A SOURCE" onClick={handleClick} /> :
                <>
                    <Button name="x" title="X" onClick={handleClick} />
                    <form onSubmit={handleSubmit}>
                        <label>Source URL</label> <br />
                        <input type="text" name="url" required /> <br />
                        <label>Access Control</label> <br />
                        <select name="source_section">
                            <option>Select</option>
                            <option value="all">All</option>
                            <option value="compliance">Compliance</option>
                            <option value="hr">HR</option>
                            <option value="tech">TECH</option>
                        </select> <br />
                        <label>Refresh Interval</label> <br />
                        <select name="refresh_interval">
                            <option>Select</option>
                            <option value="5">5min</option>
                            <option value="30">30min</option>
                            <option value="60">1hr</option>
                        </select> <br />
                        <input type="submit" />
                    </form>
                </>
            }
        </>
    );

}

export default SideBar;
