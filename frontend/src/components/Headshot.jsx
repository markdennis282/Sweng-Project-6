// import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";


import styles from "./Headshot.module.css";
function Headshot({ info, image }) {
    return (
        <div className={styles.headshot}>
            <img className={styles.headshot_img} src={image} ></img>
            <div className={styles.info}>
                {info.map((x, i) => (
                    i === 0 ? <h1 key={i}>{x}</h1> : <p key={i}>{x}</p>
                ))}
            </div>
        </div>
    );
}

Headshot.propTypes = {
    info: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.object.isRequired
};

export default Headshot;
