import { useState } from "react";

// import AddSourceForm from "./components/AddSourceForm.jsx";
import Layout from "./components/Layout.jsx";
import SingleSelectionButtonGroup from "./components/SingleSelectionButtonGroup.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
// import LogoScreen from "./components/LogoScreen.jsx";

import "./App.css";
import styles from "./App.module.css";
import ManageSourcesPage from "./pages/ManageSourcesPage.jsx";

function App() {

    const pages = ["Chat", "Manage sources"];
    const [selectedPage, setSelectedPage] = useState("Chat");
    const [onMenuScreen, setOnMenuScreen] = useState(true);

    const handlePageChange = item => {
        setSelectedPage(item);
    };
    const handleMenuToggle = () => {
        setOnMenuScreen(!onMenuScreen);
    };

    const menuComponent = <div className={styles.menuContainer}>
        <SingleSelectionButtonGroup items={pages} onChange={handlePageChange} buttonClassName={styles.menuButton} />
        <div className={styles.returnHome} onClick={handleMenuToggle}>m</div>
        {/* <AddSourceForm /> */}
    </div>;

    if(onMenuScreen) {
        return (
            <LandingPage onButtonClick={handleMenuToggle} />
        );
    } else {
        return (
            <>
                <Layout menuComponent={menuComponent}>
                    { selectedPage === "Chat" && <ChatPage /> }
                    { selectedPage === "Manage sources" && <ManageSourcesPage /> }
                </Layout>
            </>
            // <LogoScreen /> /* errors happening with images not appearing when making ternary to change screen*/
        );
    }
}

export default App;
