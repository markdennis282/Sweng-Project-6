import SingleSelectionButtonGroup from "./SingleSelectionButtonGroup";

import styles from "./NavBar.module.css";

function NavBar() {
    const items = ["ALL", "COMPLIANCE", "HR", "TECH"];

    return (
        <SingleSelectionButtonGroup
            className={styles.navbar}
            buttonClassName={styles.navbarButton}
            items={items}
            onChange={() => {}}
        />
    );
}

export default NavBar;
