import PropTypes from "prop-types";

import styles from "./Modal.module.css";

function Modal({ children, className, ...props }) {
    const fullClassName = className ? `${styles.modal} ${className}` : styles.modal;

    return (
        <div className={styles.overlay}>
            <div className={fullClassName} {...props}>
                { children }
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Modal;
