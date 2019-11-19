import React, { Component } from 'react'
import LoginForm from '../../forms/login/LoginForm'
import RegisterForm from '../../forms/register/RegisterForm'
import Button from '../../common/button/Button'
import './Login.css'
import logo from '../../assets/ialogo.png'

export default class Login extends Component {
    state={
        login:true,
        alternateText:"you are not a member yet?",
        alternateButton:"Register"
    }

    onAlter=()=>{
        let login,alternateText,alternateButton
        if(!this.state.login){
            login=!this.state.login
            alternateText="you are not a member yet?"
            alternateButton="register"
        }else{
            login=!this.state.login
            alternateText="you are already a member?"
            alternateButton="login"
        }

        this.setState({login,alternateText,alternateButton})
        
    }

    onLogin=()=>this.props.history.push("/")
    render() {
        const {login,alternateText,alternateButton}=this.state

        return (
            <div className="login-page">
                    <div className="heading">
                            <label>{alternateText}</label>
                            <Button text={alternateButton} onClick={this.onAlter}/>
                    </div>
                    <div className="form-container">
                        <div className="header">
                            <img src={logo}/>
                            <label>{login ? "Login":"Register"}</label>
                        </div>
                       
                        {
                            login ? <LoginForm onLogin={this.onLogin}/> : <RegisterForm/>
                        }
                    </div>
            </div>
        )
    }
}
