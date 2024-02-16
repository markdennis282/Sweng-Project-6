import PropTypes from "prop-types";

import SingleSelectionButtonGroup from "./SingleSelectionButtonGroup";

import styles from "./NavBar.module.css";

function NavBar({ items, onChange }) {

    return (
        <SingleSelectionButtonGroup
            className={styles.navbar}
            buttonClassName={styles.navbarButton}
            items={items}
            onChange={onChange}
        />
    );
}

NavBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired // should take (item: string, index: number)
};

export default NavBar;
