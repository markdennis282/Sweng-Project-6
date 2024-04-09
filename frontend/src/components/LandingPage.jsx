// import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";


import styles from "./LandingPage.module.css";
import Headshot from "./Headshot";
function LandingPage({ onButtonClick }) {
    const handleClick = () => {
        onButtonClick();
    };
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.botHeader}>meet millennium</div>
            <div className={styles.logoContainer}>
                <svg width="100%" height="150px">
                    <text x="140px" y="60%" fill="white" onClick={handleClick}>marvin.</text>
                </svg>
            </div>
            <div className={styles.aboutText}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere illo minus culpa mollitia unde commodi inventore voluptatem obcaecati molestias, rerum molestiae neque sapiente nesciunt odio beatae iure non, sequi deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quis error deleniti itaque voluptatum possimus qui aperiam perferendis alias nesciunt ea doloremque accusantium doloribus animi illum quasi quaerat, libero ut?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, qui! Temporibus aspernatur quos mollitia molestias quidem obcaecati. Eaque accusantium fugit voluptate culpa, doloribus est molestias aut ea dolore maxime pariatur!</div>
            <div className={styles.aboutTeam}>
                <div className={styles.teamHeader}> our team</div>
                <div className={styles.gallery}>
                    <div>
                        <Headshot info={["3rd Year", "dog"]} />
                        <Headshot info={["3rd Year", "dog"]} />
                        <Headshot info={["3rd Year", "dog"]} />
                        <Headshot info={["3rd Year", "dog"]} />
                        <Headshot info={["3rd Year", "dog"]} />
                    </div>
                    <div>
                        <Headshot info={["2nd Year", "dog", "cat"]} />
                        <Headshot info={["2nd Year", "dog"]} />
                        <Headshot info={["2nd Year", "dog"]} />
                        <Headshot info={["2nd Year", "dog"]} />
                        <Headshot info={["2nd Year", "dog"]} />
                        <Headshot info={["2nd Year", "dog"]} />
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
