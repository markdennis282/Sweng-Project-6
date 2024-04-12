/* eslint-disable @stylistic/max-len */
import axios from "axios";
import PropTypes from "prop-types";

import Button from "./Button";
import Modal from "./Modal";
import { apiUrl } from "../utils/apiAccess";
import { isValidUrl } from "../utils/validation";

import styles from "./ModalAddSource.module.css";

function ModalAddSource({ onCancel, onSubmit }) {

    const handleCancel = onCancel ?? (() => {});

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
                if(onSubmit) onSubmit();
            } catch(error) {
                console.error(error);
            }
        }
    };

    return (
        <Modal>
            <h1 className={styles.header}>Add a new source</h1>
            <form id="addSourceForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label> <br />
                <input className={styles.formInput} type="text" name="name" id="name" required /> <br />
                <label htmlFor="url">Source URL</label> <br />
                <input className={styles.formInput} type="text" name="url" id="url" required placeholder="e.g. www.amazon/gdpr" /> <br />
                <label htmlFor="accessControl">Access Control</label> <br />
                <select className={styles.formInput} name="section" id="accessControl" >
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
                </select>
            </form>
            <div className={styles.buttonContainer}>
                <Button text="Cancel" onClick={handleCancel} />
                <Button text="Save" type="submit" form="addSourceForm" className={styles.submitButton} />
            </div>
        </Modal>
    );
}

ModalAddSource.propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
};

export default ModalAddSource;
