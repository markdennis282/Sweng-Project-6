// Button.jsx
import "./Button.css";
import PropTypes from "prop-types";

function Button({ text, highlighted, className, ...props }) {
    const style = highlighted ? "navButton highlighted" : "navButton";
    const fullClassName = className ? `${style} ${className}` : style;
    return <button className={fullClassName} {...props}>{ text }</button>;
}

// Button.propTypes = {
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     onClick: PropTypes.func,
//     status: PropTypes.string
// };

Button.propTypes = {
    text: PropTypes.string.isRequired,
    highlighted: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
