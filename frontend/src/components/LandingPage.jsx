// import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";


import styles from "./LandingPage.module.css";
import Headshot from "./Headshot";

import adel from "../assets/headshots/adel.jpeg";
import audrey from "../assets/headshots/audrey.jpeg";
import nancy from "../assets/headshots/nancy.jpeg";
import inam from "../assets/headshots/inam.jpeg";
import mark_d from "../assets/headshots/mark_d.jpeg";
import mark_h from "../assets/headshots/mark_h.jpeg";
import creagh from "../assets/headshots/creagh.jpeg";
import ruslan from "../assets/headshots/ruslan.jpeg";
import pierce from "../assets/headshots/pierce.jpeg";
import dario from "../assets/headshots/dario.jpeg";
import michal from "../assets/headshots/michal.jpeg";

function LandingPage({ onButtonClick }) {
    const handleClick = () => {
        onButtonClick();
    };
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.botHeader}>meet millennium</div>
            <div className={styles.logoContainer}>
                <svg width="100%" height="100px">
                    <text x="140px" y="80%" fill="white" onClick={handleClick}>marvin.</text>
                </svg>
            </div>
            <div className={styles.aboutText}>
                <p>Meet Marvin!</p>
                <p>Don't have time to read up on the lastest updates of your required documents?</p> 
                <p>Ask Marvin!</p>
                <p>Marvin allows you to stay up-to-date on the latest information for your specific department and also add your own sources to query.</p> 
            </div>
            <div className={styles.aboutTeam}>
                <div className={styles.teamHeader}> our team</div>
                <div className={styles.gallery}>
                    <div>
                        <Headshot info={["Michal Bronicki", "3rd Year", "Backend Team"]} image={michal} />
                        <Headshot info={["Dario Cipani", "3rd Year", "Frontend Team"]} image={dario} />
                        <Headshot info={["Mark Dennis", "3rd Year", "Data Crawling Team"]} image={mark_d} />
                        <Headshot info={["Creagh Duggan", "3rd Year", "Data Crawling Team"]} image={creagh} />
                        <Headshot info={["Mark Healy", "3rd Year", "LLM Team"]} image={mark_h} />
                    </div>
                    <div>
                        <Headshot info={["Adel Shaaban", "2nd Year", "LLM Team"]} image={adel} />
                        <Headshot info={["Nancy Heppe", "2nd Year", "Backend Team"]} image={nancy} />
                        <Headshot info={["Audrey Del Rosario", "2nd Year", "Frontend Team"]} image={audrey} />
                        <Headshot info={["Pierce Buckley", "2nd Year", "Frontend Team"]} image={pierce} />
                        <Headshot info={["Ruslan Kirniev", "2nd Year", "LLM Team"]} image={ruslan} />
                        <Headshot info={["Inam Syed", "2nd Year", "Frontend Team"]} image={inam} />
                    </div>
                </div>

            </div>
        </div>
    );
}

LandingPage.propTypes = {
    onButtonClick: PropTypes.func.isRequired
};

export default LandingPage;
