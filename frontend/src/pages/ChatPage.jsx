import { useState } from "react";

import ChatBox from "../components/ChatBox";
import NavBar from "../components/NavBar";

function ChatPage() {
    const sourceTags = ["ALL", "COMPLIANCE", "HR", "TECH"];
    const [selectedSourceTag, setSelectedSourceTag] = useState("ALL");

    const handleSourceChange = item => {
        setSelectedSourceTag(item);
    };

    return (
        <>
            <NavBar items={sourceTags} onChange={handleSourceChange} />
            <ChatBox sourceTag={selectedSourceTag} />
        </>
    );
}

export default ChatPage;
