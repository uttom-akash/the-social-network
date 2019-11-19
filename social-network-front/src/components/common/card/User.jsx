import React from 'react'
import Button from '../button/Button'
import './User.css'

export default ({proPic,userName,btnText,onFollow,onClick,measure,userId})=>{
    return (
        <div className="user-card">            
                <div className="user-pic" onClick={()=>onClick(`/profile-view/${userId}`)}>
                    <img src={proPic}  onLoad={measure}/>
                </div>
                <div className="user-name">
                    <label>{userName}</label>
                </div>
                <Button onClick={onFollow} clsName={"follow-btn"} text={btnText}></Button>
        </div>
    )
}
