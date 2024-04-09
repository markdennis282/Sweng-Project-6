import PropTypes from "prop-types";

import Button from "./Button";
import Modal from "./Modal";

import styles from "./ModalDeleteSource.module.css";

function ModalDeleteSource({ sourceId, onCancel, onDelete }) {

    const handleCancel = onCancel ?? (() => {});
    const handleDelete = () => {
        console.log(`Delete source "${sourceId}"`);
        if(onDelete) onDelete();
    };

    return (
        <Modal className={styles.modal}>
            <div className={styles.container}>
                <p className={styles.message}>
                    Are you sure you want to delete source &quot;{ sourceId }&quot;?
                </p>
                <div>
                    <Button text="Cancel" onClick={handleCancel} />
                    <Button text="Delete" onClick={handleDelete} className={styles.deleteButton} />
                </div>
            </div>
        </Modal>
    );
}

ModalDeleteSource.propTypes = {
    sourceId: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func
};

export default ModalDeleteSource;
