// Button.jsx
import "./Button.css";
import PropTypes from "prop-types";

function Button({ name, title }) {
    return <button type="button" className={name}> { title }</button>;
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default Button;
