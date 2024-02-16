import PropTypes from "prop-types";

import styles from "./Button.module.css";

function Button({ text, highlighted, className, ...props }) {
    let cssStylesClassNames = styles.button;
    if(highlighted) cssStylesClassNames += ` ${styles.highlighted}`;
    const fullClassName = className ? `${cssStylesClassNames} ${className}` : cssStylesClassNames;

    return <button className={fullClassName} {...props}>{ text }</button>;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
