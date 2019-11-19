import React from 'react';
import './Button.css'

export default ({text,onClick,clsName,disabled=false})=>{
    return (
        <button id={`custom-button-${disabled}`} className={clsName} onClick={onClick} disabled={disabled}>{text}</button>
    );
}
