import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import ChatMessage from "./ChatMessage";
import SuggestedPrompt from "./SuggestedPrompt";

import { getChatStreamResponse } from "../utils/apiAccess";

import styles from "./ChatBox.module.css";

import BounceLoader from "react-spinners/BounceLoader";

function ChatBox({ sourceTag }) {
    const [messages, setMessages] = useState([]);
    const userInputRef = useRef(null);
    const chatBottomRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const addMessage = newMessage => {
        setMessages(m => [...m, newMessage]);
    };

    useEffect(() => {
        addMessage({ sender: "system", contents: `Category changed to ${sourceTag}` });
    }, [sourceTag]);

    // scrolls to the bottom of the chat box
    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleInputSubmission = async event => {
        if(event && event.key !== "Enter") return;
        const messageContents = userInputRef.current.value.trim();
        userInputRef.current.value = "";
        if(!messageContents) return;

        addMessage({ sender: "user", contents: messageContents });

        setLoading(true);

        try {
            const messageIterator = getChatStreamResponse(messageContents, sourceTag.toLowerCase());
            for await (const message of messageIterator) {
                if(message.message_type === "update") {
                    addMessage({ sender: "system", contents: message.message_content });
                } else if(message.message_type === "final_response") {
                    addMessage({ sender: "ai", contents: message.message_content });
                } else if(message.message_type === "error") {
                    addMessage({ sender: "system", contents: `Error: ${message.message_content}` });
                } else {
                    console.log("Unknown message received:", message);
                }
            }
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    const handleInputClear = event => {
        if(event.key !== "Enter") return;
        userInputRef.current.value = "";
    };

    const chooseSuggestion = suggestionText => {
        userInputRef.current.value = suggestionText;
        handleInputSubmission();
    };


    return (
        <>
            <div className={styles.chatBox}>

                <div className={styles.messageBox}>
                    <div className={styles.suggestionContainer}>
                        <div className={styles.suggestion_col}>
                            <SuggestedPrompt contents="What is an Amazon Alexa for business?" onClick={chooseSuggestion}> </SuggestedPrompt>
                            <SuggestedPrompt contents="Where am I?" onClick={chooseSuggestion}> </SuggestedPrompt>
                        </div>
                        <div className={styles.suggestion_col}>
                            <SuggestedPrompt contents="What time is it?" onClick={chooseSuggestion}> </SuggestedPrompt>
                            <SuggestedPrompt contents="Who are you?" onClick={chooseSuggestion}> </SuggestedPrompt>
                        </div>
                    </div>

                    { messages.map((msg, index) =>
                        <ChatMessage sender={msg.sender} contents={msg.contents} key={index} />
                    ) }
                    <div ref={chatBottomRef} className={loading ? styles.bottomContainerLoading : ""} />
                </div>

                { loading &&
                    <div className={styles.spinner}>
                        <BounceLoader
                            size="3em"
                            color="white"
                            loading={loading}
                            speedMultiplier="1"
                        />
                    </div>
                }

                <textarea
                    name="chatInput"
                    rows="6"
                    placeholder="Type your query and hit enter..."
                    className={styles.chatInputField}
                    onKeyDown={handleInputSubmission}
                    onKeyUp={handleInputClear}
                    ref={userInputRef}
                />
            </div>
        </>
    );
}

ChatBox.propTypes = {
    sourceTag: PropTypes.string.isRequired
};

export default ChatBox;
