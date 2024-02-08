// App.jsx
import NavBar from "./components/NavBar.jsx";
import Sidebar from "./components/SideBar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import "./App.css";

function App() {
    return (
        <>
            <div className="bg_gradient">
                <NavBar />
                <Sidebar />
                <ChatBox />
            </div>
        </>
    );
}

export default App;
