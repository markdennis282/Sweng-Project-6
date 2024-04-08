import PropTypes from "prop-types";

import styles from "./SuggestedPrompt.module.css";

function SuggestedPrompt({ contents, onClick, ...props }) {
    const handleClick = () => {
        onClick(contents);
        // You can use this value as needed, such as passing it to a function or component
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
