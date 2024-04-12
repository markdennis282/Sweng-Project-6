/* eslint-disable @stylistic/max-len */
import axios from "axios";
import PropTypes from "prop-types";

import Button from "./Button";
import Modal from "./Modal";
import { apiUrl } from "../utils/apiAccess";
import { isValidUrl } from "../utils/validation";

import styles from "./ModalAddSource.module.css";

function ModalEditSource({
    initialSourceId,
    initialName,
    initialUrl,
    initialSection,
    initialRefreshInterval,
    onCancel,
    onSubmit
}) {

    const handleCancel = onCancel ?? (() => {});

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        formDataObject.source_id = initialSourceId;

        if(formDataObject.source_section === "Select" ||
            formDataObject.refresh_interval === "Select" ||
            !isValidUrl(formDataObject.url)) {
            // alert("invalid");
        } else {
            try {
                console.log(formDataObject);
                await axios.put(apiUrl("/source"), formDataObject);
                if(onSubmit) onSubmit();
            } catch(error) {
                console.error(error);
            }
        }
    };

    return (
        <Modal>
            <h1 className={styles.header}>Edit source</h1>
            <form id="addSourceForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label> <br />
                <input className={styles.formInput} type="text" name="name" id="name" defaultValue={initialName} required /> <br />
                <label htmlFor="url">Source URL</label> <br />
                <input className={styles.formInput} type="text" name="url" id="url" required defaultValue={initialUrl} /> <br />
                <label htmlFor="accessControl">Access Control</label> <br />
                <select className={styles.formInput} name="section" id="accessControl" defaultValue={initialSection}>
                    <option>Select</option>
                    <option value="all">All</option>
                    <option value="compliance">Compliance</option>
                    <option value="hr">HR</option>
                    <option value="tech">TECH</option>
                </select> <br />
                <label htmlFor="refreshInterval">Refresh Interval</label> <br />
                <select className={styles.formInput} name="refresh_interval" id="refreshInterval" defaultValue={initialRefreshInterval}>
                    <option>Select</option>
                    <option value="5">5min</option>
                    <option value="30">30min</option>
                    <option value="60">1hr</option>
                </select>
            </form>
            <div className={styles.buttonContainer}>
                <Button text="Cancel" onClick={handleCancel} />
                <Button text="Save" type="submit" form="addSourceForm" className={styles.submitButton} />
            </div>
        </Modal>
    );
}

ModalEditSource.propTypes = {
    initialSourceId: PropTypes.number.isRequired,
    initialName: PropTypes.string.isRequired,
    initialUrl: PropTypes.string.isRequired,
    initialSection: PropTypes.string.isRequired,
    initialRefreshInterval: PropTypes.number.isRequired,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
};

export default ModalEditSource;
