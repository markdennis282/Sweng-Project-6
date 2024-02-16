import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import ChatMessage from "./ChatMessage";

import { apiUrl } from "../utils/apiAccess";

import styles from "./Chatbox.module.css";

function ChatBox({ sourceTag }) {
    const [messages, setMessages] = useState([]);
    const userInputRef = useRef(null);
    const chatBottomRef = useRef(null);

    // scrolls to the bottom of the chat box
    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleInputSubmission = async event => {
        if(event.key !== "Enter") return;
        const messageContents = userInputRef.current.value.trim();
        userInputRef.current.value = "";
        if(!messageContents) return;

        setMessages([...messages, { sender: "user", contents: messageContents }]);

        try {
            const response = await axios.post(apiUrl("/chat"), {
                prompt: messageContents,
                section: sourceTag
            });
            setMessages(m => [...m, { sender: "ai", contents: response.data.response }]);
        } catch(error) {
            console.log(error);
        }

    };

    const handleInputClear = event => {
        if(event.key !== "Enter") return;
        userInputRef.current.value = "";
    };


    return (
        <>
            <div className={styles.chatBox}>
                <div className="sourcetag">{ sourceTag }</div>
                <textarea
                    name="chatInput"
                    rows="6"
                    placeholder="Type your message and hit enter ..."
                    className={styles.chatInputField}
                    onKeyDown={handleInputSubmission}
                    onKeyUp={handleInputClear}
                    ref={userInputRef}
                />
                <div className={styles.messageBox}>
                    { messages.map((msg, index) =>
                        <ChatMessage sender={msg.sender} contents={msg.contents} key={index} />
                    ) }
                    <div ref={chatBottomRef} />
                </div>
            </div>
        </>
    );
}

ChatBox.propTypes = {
    sourceTag: PropTypes.string.isRequired
};

export default ChatBox;
