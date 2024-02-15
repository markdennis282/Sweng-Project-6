// ChatBox.jsx
import "./ChatBox.css";
import { useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";


function ChatBox({ sourceTags }) {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const chatBottomRef = useRef(null);

    // Function to scroll to the bottom of the chat box
    const scrollToBottom = () => {
        chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleInputSubmission = event => {
        if(event.key === "Enter" && inputValue.trim() !== "") {
            let contents = inputValue.trim();
            let sender = "user";
            setMessages([...messages, { sender, contents }]);
            setInputValue("");
            let response = null;

            setTimeout(async() => {
                try {
                    response = await axios.get("http://localhost:8000/query_rag", {
                        params: {
                            query: inputValue,
                            sourceTags: sourceTags
                        }
                    });
                    // \N IN CHAT
                    // console.log("source tag : " + sourceTags);
                    // console.log(response);
                    console.log(response.config.params);
                    contents = response.data;
                    sender = "ai";
                    setMessages(m => [...m, { sender, contents }]);
                    scrollToBottom();
                } catch(error) {
                    console.log("llmError");
                }
            }, 250);
        }
    };


    return (
        <>
            <div className="chat_box">
                <div className="sourcetag">{ sourceTags }</div>
                <textarea //name="input" webissue
                    rows="6"
                    placeholder="Type Your Message Here And Hit Qasim ..."
                    className="chat_input_field"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputSubmission}
                />
                <div className="message_box">
                    { messages.map((msg, index) => (
                        <div key={index} className="message">
                            <div className="sender_icon" id={msg.sender} />
                            <p key={index} id={msg.sender}>{ msg.contents }</p>
                        </div>
                    ))}
                    <div ref={chatBottomRef} />
                </div>
            </div>
        </>
    );
}

ChatBox.propTypes = {
    sourceTags: PropTypes.string
};

export default ChatBox;
