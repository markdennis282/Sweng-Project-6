import axios from "axios";
import { apiUrl } from "../utils/apiAccess";
import { isValidUrl } from "../utils/validation";

import styles from "./AddSourceForm.module.css";

function AddSourceForm() {

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
                const configObject = {
                    type: "web",
                    config: {
                        url: formDataObject.url
                    }
                };

                await axios.post(`http://localhost:5000/config", ${configObject}`);
                const seconds = parseInt(formDataObject.refresh_interval) * 60; 
                await axios.post(`http://localhost:5000/schedule?seconds=${seconds}`);
            } catch(error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <h1 className={styles.header}>Add a new source</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="url">Source URL</label> <br />
                <input className={styles.formInput} type="text" name="url" id="url" required placeholder="e.g. www.amazon/gdpr" /> <br />
                <label htmlFor="accessControl">Access Control</label> <br />
                <select className={styles.formInput} name="source_section" id="accessControl" >
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
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </>
    );
}

export default AddSourceForm;
