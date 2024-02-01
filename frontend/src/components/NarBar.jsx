// NavBar.jsx
import "./NavBar.css";
import Button from "./Button.jsx";

function NavBar(){
    return ( 
    <>
        <div className="navbar">
            <Button name="navButton left" title="ADD A SOURCE"/>
            <Button name="navButton right" title="ALL"/>
            <Button name="navButton right" title="COMPLIANCE"/>
            <Button name="navButton right" title="HR"/>
            <Button name="navButton right" title="TECH"/>
        </div>
    </>
   );
}

export default NavBar