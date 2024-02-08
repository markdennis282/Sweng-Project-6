// ChatBox.jsx
import "./ChatBox.css";
import { useState } from "react";

function ChatBox() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleInputSubmission = event => {
        if(event.key === "Enter" && inputValue.trim() !== "") {
            let contents = inputValue.trim();
            let sender = "user";
            setMessages([...messages, { sender, contents }]);
            setInputValue("");

            //dynamic scrolling here

            setTimeout(() => {
                contents = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptatum corporis autem fugiat eum perspiciatis incidunt nihil quas, officia, laudantium reprehenderit quasi quo quibusdam? Dolores laudantium iure ab facilis officia?";
                sender = "ai";
                setMessages(m => [...m, { sender, contents }]);
            }, 250);

            //COPY SAME dynamic scrolling here

        }

    };


    return (
        <>
            <div className="chat_box">
                <textarea
                    rows="6"
                    placeholder="Type Your Message Here And Hit Enter..."
                    className="chat_input_field"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleInputSubmission}
                />

                <div className="message_box">
                    { messages.map((msg, index) => (
                        <div key={index} className="message">
                            <div className="sender_icon" id={msg.sender} />
                            <p key={index} id={msg.sender}>{ msg.contents }</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}


export default ChatBox;
