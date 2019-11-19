import React, { Component } from 'react'
import {Form} from 'semantic-ui-react'
import Button from '../../common/button/Button'
import Header from '../../common/header/Header'
import {connect} from 'react-redux'
import {login} from '../../../redux/actions/AccountAction'
import '../register/Register.css'

 class LoginForm extends Component {
    state={
        email:"",
        password:"",
     
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

        this.setState({loading:true})

        const {email,password}=this.state
        
        this.props.login({email,password})
            .then(resp=>this.props.onLogin())
            .catch(err=>this.setState({loading:false,status:"something unexpected happend,try again.."}))
        
    }
    

    render() {
        const {email,password,loading}=this.state
        return (
               <Form loading={loading} onSubmit={this.onSubmit}>
                   <Header 
                    header="Welcome To Socal Network"
                   />
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
                    <Button text="login"/>
                </Form> 
            
        )
    }
}


export default connect(null,{login})(LoginForm)