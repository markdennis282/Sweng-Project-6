import PropTypes from "prop-types";

import styles from "./ChatMessage.module.css";
import AvatarIcon from "./AvatarIcon";

function ChatMessage({ sender, contents, ...props }) {
    if(sender === "user") {
        return (
            <div className={styles.messageContainer} {...props}>
                <AvatarIcon size="3em" backgroundColor="#012A4E" iconSrc="user-icon.svg" className={styles.userIcon} />
                <p className={styles.messageUser}>{ contents }</p>
            </div>
        );
    }
    if(sender === "ai") { 
        return (
            <div className={styles.messageContainer} {...props}>
                <AvatarIcon size="3em" backgroundColor="#004176" iconSrc="Marvin.svg" className={styles.aiIcon} /> 
                <p className={styles.messageAi}>{ contents }</p>
            </div>
        );
    }
    if(sender === "system") {
        return (
            <div className={styles.messageContainer} {...props}>
                <p className={styles.messageSystem}>{ contents }</p>
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
