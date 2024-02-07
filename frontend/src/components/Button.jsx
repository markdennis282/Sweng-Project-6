// Button.jsx
import "./Button.css";
import PropTypes from "prop-types";

function Button({ name, title, onClick, status }) {
    return <button onClick={onClick} type="button" id={status} className={name}> { title }</button>;
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    status: PropTypes.string
};

export default Button;
