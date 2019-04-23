import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    // classes are added in array, (because it has more elements), and hen joined
    <button 
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')} 
    onClick={props.clicked}>{props.children}</button>
);

export default button;