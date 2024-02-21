import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./Layout.module.css";

function Layout({ menuComponent, children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className={styles.outerContainer}>
                <button
                    onClick={toggleMenu}
                    className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonTransformed : ""}`}
                >
                    <img
                        src="arrow-right.svg"
                        className={`${styles.menuButtonIcon} ${isMenuOpen ? styles.menuButtonIconFlipped : ""}`}
                    />
                </button>
                <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
                    { menuComponent }
                </div>
                <div className={`${styles.mainContent} ${isMenuOpen ? styles.mainContentWithMenuOpen : ""}`}>
                    <div className={styles.innerContainer}>
                        { children }
                    </div>
                </div>
            </div>
        </>
    );
}

Layout.propTypes = {
    menuComponent: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
};

export default Layout;
