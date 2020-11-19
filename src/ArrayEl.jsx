import React from 'react';

export default function ArrayEl(props) {
    let arrayStyle = {
        width: `${100/props.numElements}%`,
        height: `${props.value/2}%`
    }

    let displayVal;
    if (props.numElements < 15) {
        displayVal = props.value;
    } else {
        displayVal = null;
    }
    return (
        <div className="array-element" style={arrayStyle}>{displayVal}</div>
    )
}