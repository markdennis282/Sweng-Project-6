import { useState } from "react";
import axios from "axios";

import { apiUrl } from "../utils/apiAccess";
import { isValidUrl } from "../utils/validation";

import Button from "./Button";

import styles from "./SideBar.module.css";

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

        if(formDataObject.source_section === "Select" ||
            formDataObject.refresh_interval === "Select" ||
            !isValidUrl(formDataObject.url)) {
            // alert("invalid");
        } else {
            try {
                console.log(formDataObject);
                await axios.post(apiUrl("/source"), formDataObject);
            } catch(error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            { !open ?
                <Button className={styles.openButton} text="ADD A SOURCE" onClick={handleClick} /> :
                <>
                    <Button className={styles.closeButton} text="X" onClick={handleClick} />
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="url">Source URL</label> <br />
                        <input className={styles.formInput} type="text" name="url" id="url" required /> <br />
                        <label htmlFor="accessControl">Access Control</label> <br />
                        <select className={styles.formInput} name="source_section" id="accessControl">
                            <option>Select</option>
                            <option value="all">All</option>
                            <option value="compliance">Compliance</option>
                            <option value="hr">HR</option>
                            <option value="tech">TECH</option>
                        </select> <br />
                        <label htmlFor="refreshInterval">Refresh Interval</label> <br />
                        <select className={styles.formInput} name="refresh_interval" id="refreshInterval">
                            <option>Select</option>
                            <option value="5">5min</option>
                            <option value="30">30min</option>
                            <option value="60">1hr</option>
                        </select> <br />
                        <input className={`${styles.formInput} ${styles.submit}`} type="submit" />
                    </form>
                </>
            }
        </>
    );
}

export default SideBar;
