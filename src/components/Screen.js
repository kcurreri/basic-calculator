import React from 'react';
import { Textfit } from 'react-textfit';
import './Screen.css';

const Screen = (props) => {
    return (
        <React.Fragment>
            <p className="meta-info">{props.metaInfo}</p>
            <Textfit className="screen" mode="single" max={70}>
                {props.value}
            </Textfit>
        </React.Fragment>
    );
};

export default Screen;
