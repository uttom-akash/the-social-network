import React from 'react';
import './App.css';
import  Navbar from './components/navigation/navbar/Navbar'
import Routes from './components/navigation/routes/Routes'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

class App extends React.Component {

  componentDidMount=()=>{
    if(!!localStorage.getItem("user"))this.pushIn();
    else this.pushOut()

    this.timer=setInterval(()=>{
      if(!!localStorage.getItem("user"))this.pushIn();
      else this.pushOut()

    },5000)
  }

  componentWillMount=()=>clearInterval(this.timer)


  pushOut=()=>{
    const {location,history}=this.props
    if(location.pathname==="/login" || !!RegExp("/confirm-email/.*/.*").exec(location.pathname) || location.pathname==='/resend-email')return;
    history.push("/login")
  }

  pushIn=()=>{
      const {location,history}=this.props
      if(location.pathname==="/login"){
          history.push("/")
      }
  }


  render() {
    const {location}=this.props
    
    return (
          <div className="App">
              {       location.pathname!=='/login' 
                      && !(!!RegExp("/confirm-email/.*/.*").exec(location.pathname)) 
                      && location.pathname!=='/resend-email' && <Navbar/>}
              <div className="page-container">
                  <Routes/>
              </div>
          </div>
    )
  }
}

export default (withRouter(App));
