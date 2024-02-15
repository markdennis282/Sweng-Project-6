import PropTypes from "prop-types";

import styles from "./ChatMessage.module.css";

function ChatMessage({ sender, contents, ...props }) {
    if(sender === "user") {
        return (
            <div className={styles.messageContainer} {...props}>
                <div className={styles.senderIconUser} />
                <p className={styles.messageUser}>{ contents }</p>
            </div>
        );
    }
    if(sender === "ai") {
        return (
            <div className={styles.messageContainer} {...props}>
                <div className={styles.senderIconAi} />
                <p className={styles.messageAi}>{ contents }</p>
            </div>
        );
    }

    throw new Error("Invalid message type");
}

ChatMessage.propTypes = {
    sender: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired
};

export default ChatMessage;
