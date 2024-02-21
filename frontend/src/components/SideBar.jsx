// SideBar.jsx
import Button from "./Button";
import "./Button.css";
import "./SideBar.css";

import { useState } from "react";
import axios from "axios";

import { apiUrl } from "../utils/apiAccess";

function SideBar() {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const urlRegex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        if(formDataObject.source_section === "Select" ||
            formDataObject.refresh_interval === "Select" ||
            !urlRegex.test(formDataObject.url)) {
            // console.log("invalid");
        } else {
            try {
                // console.log(formDataObject);
                await axios.post(apiUrl("/source"), formDataObject);
            } catch(error) {
                // console.error("Error", error);
            }
        }

    };

    return (
        <>
            { !open ?
                <Button name="navButton left" title="ADD A SOURCE" onClick={handleClick} /> :
                <>
                    <Button name="x" title="X" onClick={handleClick} />
                    <form onSubmit={handleSubmit}>
                        <label>Source URL <br />
                            <input className="button url" type="text" name="url" required /> <br />
                        </label>
                        <label>Access Control <br />
                            <select className="button accessCtrl" name="source_section">
                                <option>Select</option>
                                <option value="all">All</option>
                                <option value="compliance">Compliance</option>
                                <option value="hr">HR</option>
                                <option value="tech">TECH</option>
                            </select> <br />
                        </label>
                        <label>Refresh Interval <br />
                            <select className="button refreshInt" name="refresh_interval">
                                <option>Select</option>
                                <option value="5">5min</option>
                                <option value="30">30min</option>
                                <option value="60">1hr</option>
                            </select> <br />
                        </label>
                        <input className="button submit" type="submit" />
                    </form>
                </>
            }
        </>
    );

}

export default SideBar;
