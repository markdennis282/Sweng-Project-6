import PropTypes from "prop-types";

import styles from "./SuggestedPrompt.module.css";

function SuggestedPrompt({ contents, onClick, ...props }) {
    const handleClick = () => {
        onClick(contents);
    };
    return (
        <div className={styles.suggestionContainer} {...props}>
            <button className={styles.suggestionButton} onClick={handleClick}>{ contents }  </button>
        </div>
    );

}

SuggestedPrompt.propTypes = {
    contents: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SuggestedPrompt;
