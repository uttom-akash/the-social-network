import React, { Component } from 'react'
import {Form,Message} from 'semantic-ui-react'
import Button from '../../common/button/Button'
import './Register.css'
import api from '../../../api/UserManagement'

export default class RegisterForm extends Component {
    state={
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",

        loading:false,
        success:false,
        error:false,
        status:"",
        formError:{

        }
    }

    onChange=(event)=>{
        
        this.setState({[event.target.name]:event.target.value,formError:{}})
    }
    onSubmit=(event)=>{
        event.preventDefault()
        let formError=this.onValidate()

        this.setState({loading:true,formError})
        if(Object.keys(formError).length===0){
            const {userName,email,password}=this.state
            api.register({user:{userName,password,email,followers:[],followings:[],staredPost:[]}})
                .then(resp=>this.setState({loading:false,status:"email sent to your address"}))
                .catch(err=>this.setState({loading:false,status:"something unexpected happend,try again.."}))
        }
    }


    onValidate=()=>{
        let error={}
        const {password,confirmPassword}=this.state
        if(password!==confirmPassword)error.confirmPassword="password didn't match"
        return error
    }
    
    render() {
        const {userName,email,password,confirmPassword,formError,status}=this.state
        return (
            <Form onSubmit={this.onSubmit}>
                {!!status && <Message>{status}</Message>}
                <Form.Field>
                    <Form.Input
                        required
                        placeholder="user name"
                        name="userName"
                        value={userName}
                        onChange={this.onChange}
                     /> 
                </Form.Field>
                <Form.Field>
                    <Form.Input 
                    required
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="email"
                /> 
                </Form.Field>
                <Form.Field >
                    <Form.Input type="password" 
                        required
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        placeholder="password"
                    /> 
                </Form.Field>
                <Form.Field>
                    <Form.Input type="password" 
                        required
                        error={!!formError.confirmPassword && {content:formError.confirmPassword,pointing:'below'}}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.onChange}
                        placeholder="confirm paswword"
                    /> 
                </Form.Field>
                <Button text="register"/>
            </Form>
        )
    }
}
