import { useState } from "react";

import AddSourceForm from "./components/AddSourceForm.jsx";
import ChatBox from "./components/ChatBox.jsx";
import Layout from "./components/Layout.jsx";
import NavBar from "./components/NavBar.jsx";
import LogoScreen from "./components/LogoScreen.jsx";

import "./App.css";

function App() {

    const sourceTags = ["ALL", "COMPLIANCE", "HR", "TECH"];
    const [selectedSourceTag, setSelectedSourceTag] = useState("ALL");

    const handleSourceChange = item => {
        setSelectedSourceTag(item);
    };

    return (
        <>
            <Layout menuComponent={<AddSourceForm />}>
                <NavBar items={sourceTags} onChange={handleSourceChange} />
                <ChatBox sourceTag={selectedSourceTag} />
            </Layout>
        </>
        // <LogoScreen /> /* errors happening with images not appearing when making ternary to change screen*/
    );
}

export default App;
