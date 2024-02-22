import PropTypes from "prop-types";

import styles from "./AvatarIcon.module.css";

function AvatarIcon({ size, backgroundColor, iconSrc, className, ...props }) {
    const fullClassName = className ? `${styles.iconContainer} ${className}` : styles.iconContainer;

    const style = {
        width: size,
        height: size,
        backgroundColor: backgroundColor
    };

    return (
        <div className={fullClassName} style={style} {...props}>
            <div className={styles.iconWrapper}>
                <img src={iconSrc} className={styles.icon} />
            </div>
        </div>
    );
}

AvatarIcon.propTypes = {
    size: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    iconSrc: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default AvatarIcon;
