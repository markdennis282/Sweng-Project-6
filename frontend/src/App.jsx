// App.jsx
import NavBar from "./components/NavBar.jsx";
import Sidebar from "./components/SideBar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import "./App.css";
import { useState } from "react";

function App() {

    const sourceTags = ["ALL", "COMPLIANCE", "HR", "TECH"];
    const [selectedSourceTag, setSelectedSourceTag] = useState("ALL");

    const handleSourceChange = item => {
        setSelectedSourceTag(item);
    };

    return (
        <>
            <div className="bg_gradient">
                <NavBar items={sourceTags} onChange={handleSourceChange} />
                <Sidebar />
                <ChatBox sourceTags={selectedSourceTag} />
            </div>
        </>
    );
}

export default App;
