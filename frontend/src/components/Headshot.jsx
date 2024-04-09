// import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";


import styles from "./Headshot.module.css";

function Headshot({ info }) {
    return (
        <div className={styles.headshot}>
            <div className={styles.info}>
                { info.map((x, i) => (
                    <p key={i}>{ x }</p>
                )) }
            </div>
        </div>
    );
}

Headshot.propTypes = {
    info: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Headshot;
