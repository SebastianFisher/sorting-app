import React from 'react';

export default function ArrayItem(props) {
    let arrayStyle = {
        width: `${100/props.numElements}%`,
        height: `${props.value}%`
    }

    let pos = props.position;

    return (
        <div className={`list-element ${pos}`} style={arrayStyle}></div>
    )
}