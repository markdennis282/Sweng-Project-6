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
            <div className={styles.aboutText}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere illo minus culpa mollitia unde commodi inventore voluptatem obcaecati molestias, rerum molestiae neque sapiente nesciunt odio beatae iure non, sequi deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quis error deleniti itaque voluptatum possimus qui aperiam perferendis alias nesciunt ea doloremque accusantium doloribus animi illum quasi quaerat, libero ut?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, qui! Temporibus aspernatur quos mollitia molestias quidem obcaecati. Eaque accusantium fugit voluptate culpa, doloribus est molestias aut ea dolore maxime pariatur!</div>
            <div className={styles.aboutTeam}>
                <div className={styles.teamHeader}> our team</div>
                <div className={styles.gallery}>
                    <div>
                        <Headshot info={["Mark Dennis", "3rd Year", "Crawler"]} image={mark_d} />
                        <Headshot info={["Creagh Duggan", "3rd Year", "Crawler"]} image={creagh} />
                        <Headshot info={["Michal Bronicki", "3rd Year", "Backend"]} image={adel} />
                        <Headshot info={["Dario Cipani", "3rd Year", "Frontend"]} image={adel} />
                        <Headshot info={["Mark Healy", "3rd Year", "LLM"]} image={mark_h} />
                    </div>
                    <div>
                        <Headshot info={["Adel Shaaban", "2nd Year", "LLM"]} image={adel} />
                        <Headshot info={["Nancy Heppe", "2nd Year", "Backend"]} image={nancy} />
                        <Headshot info={["Audrey Del Rosario", "2nd Year", "Frontend"]} image={audrey} />
                        <Headshot info={["Inam Syed", "2nd Year", "Frontend"]} image={inam} />
                        <Headshot info={["Ruslan Kirniev", "2nd Year", "LLM"]} image={ruslan} />
                        <Headshot info={["Pierce Buckley", "2nd Year", "Frontend"]} image={pierce} />
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
