// Button.jsx
import "./Button.css";
import PropTypes from "prop-types";

function Button({ name, title, onClick }) {
    return <button onClick={onClick} type="button" className={name}> { title }</button>;
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;
