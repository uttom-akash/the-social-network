import React from 'react'
import './Statistics.css'

export default ({number,header,onClick})=>{
    return (
    <div className="statistics" onClick={onClick}>
        <div className="value">{number}</div>
        <div className="label">{header}</div>
      </div>
    )
}
