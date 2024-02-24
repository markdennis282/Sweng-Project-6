import marvin from "../assets/Marvin.svg";
import "./LogoScreen.css";


function LogoScreen() {


    return (
        <>
            <div>
                <img src={marvin} className="logo marvin" alt="marvin logo" />
            </div>
            <p>
                Click anywhere to continue
            </p>
        </>
    );
}

export default LogoScreen;
