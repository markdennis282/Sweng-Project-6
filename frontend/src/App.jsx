// App.jsx
import NavBar from "./components/NavBar.jsx";
import Sidebar from "./components/SideBar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import "./App.css";
import { useState } from "react";

function App() {

    const [sourceTags, setSourceTags] = useState("ALL");

    const handleButtonClick = buttonTitle => {
        setSourceTags(buttonTitle);
    };

    return (
        <>
            <div className="bg_gradient">
                <NavBar onButtonClick={handleButtonClick} />
                <Sidebar />
                <ChatBox sourceTags={sourceTags} />
            </div>
        </>
    );
}

export default App;
