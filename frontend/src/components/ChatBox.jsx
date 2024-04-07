import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import ChatMessage from "./ChatMessage";
import Button from "./Button";

import { apiUrl } from "../utils/apiAccess";

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
        // TODO: fix the message appearing twice on page refresh
        addMessage({ sender: "system", contents: `Category changed to ${sourceTag}` });
    }, [sourceTag]);

    // scrolls to the bottom of the chat box
    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // moved to own function
    const sendMessage = async () => {
        const messageContents = userInputRef.current.value.trim();
        if (!messageContents) return; 

        addMessage({ sender: "user", contents: messageContents });
        userInputRef.current.value = "";
        setLoading(true);

        try {
            const response = await fetch(apiUrl("/chat_stream"), {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: messageContents,
                    section: sourceTag
                })
            });
            const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
            while(true) {
                const { value, done } = await reader.read();
                if(done) break;
                const message = JSON.parse(value);
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

    const handleInputSubmission = event => {
        if (event.key !== "Enter") return;
        sendMessage();
    }

    /*
     * *** not deleting incase this breaks ***
     * const handleInputSubmission = async event => {
     *     if(event.key !== "Enter") return;
     * **** moving everything under here to own function ****
     *     const messageContents = userInputRef.current.value.trim();
     *     userInputRef.current.value = "";
     *     if(!messageContents) return;
     */

    //     addMessage({ sender: "user", contents: messageContents });

    //     setLoading(true);

    /*
     *     try {
     *         const response = await fetch(apiUrl("/chat_stream"), {
     *             method: "POST",
     *             headers: {
     *                 Accept: "application/json",
     *                 "Content-Type": "application/json"
     *             },
     *             body: JSON.stringify({
     *                 prompt: messageContents,
     *                 section: sourceTag
     *             })
     *         });
     *         const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
     *         while(true) {
     *             const { value, done } = await reader.read();
     *             if(done) break;
     *             const message = JSON.parse(value);
     *             if(message.message_type === "update") {
     *                 addMessage({ sender: "system", contents: message.message_content });
     *             } else if(message.message_type === "final_response") {
     *                 addMessage({ sender: "ai", contents: message.message_content });
     *             } else if(message.message_type === "error") {
     *                 addMessage({ sender: "system", contents: `Error: ${message.message_content}` });
     *             } else {
     *                 console.log("Unknown message received:", message);
     *             }
     *         }
     *     } catch(error) {
     *         console.log(error);
     *     } finally {
     *         setLoading(false);
     *     }
     */

    // };

    const handleInputClear = event => {
        if(event.key !== "Enter") return;
        userInputRef.current.value = "";
    };


    return (
        <>
            <div className={styles.chatBox}>
                { /* <div className="sourcetag">{ sourceTag }</div> */ }

                <div className={styles.messageBox}>
                    { messages.map((msg, index) =>
                        <ChatMessage sender={msg.sender} contents={msg.contents} key={index} />
                    ) }
                    {
                        loading &&
                            <BounceLoader
                                size={50}
                                color="white"
                                loading={loading}
                                speedMultiplier="1"
                            />
                    }
                    <div ref={chatBottomRef} />
                </div >

                <div className={styles.inputContainer} >
                    <textarea
                        name="chatInput"
                        rows="6"
                        placeholder="Type your query and hit enter..."
                        className={styles.chatInputField}
                        onKeyDown={handleInputSubmission}
                        onKeyUp={handleInputClear}
                        ref={userInputRef}
                    />
                    <Button text="↑" onClick={sendMessage} className={styles.sendButton} />
                </div>

            </div>
        </>
    );
}

ChatBox.propTypes = {
    sourceTag: PropTypes.string.isRequired
};

export default ChatBox;
