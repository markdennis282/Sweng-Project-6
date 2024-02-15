import { useState } from "react";
import PropTypes from "prop-types";

import Button from "./Button.jsx";

function SingleSelectionButtonGroup({ items, onChange, buttonClassName, ...props }) {

    const [selectedIndex, setSelectedIndex] = useState(0);

    //const buttons = ["ALL", "COMPLIANCE", "HR", "TECH"];

    const handleClick = index => {
        setSelectedIndex(index);
        onChange(items[index], index);
        //onButtonClick(buttons[index]);
        //console.log(buttons[index]);
    };

    return (
        <>
            <div {...props}>
                {
                    items.map((item, index) =>
                        <Button
                            key={index}
                            className={buttonClassName}
                            // style={buttonStyle}
                            // status={index === selectedIndex ? "selected" : ""}
                            // name="navButton right"
                            text={item}
                            highlighted={index === selectedIndex}
                            onClick={() => {
                                handleClick(index);
                            }}
                        />
                    )
                }
            </div>
        </>
    );
}

SingleSelectionButtonGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired, // should take (item: string, index: number)
    buttonClassName: PropTypes.string
};

export default SingleSelectionButtonGroup;
