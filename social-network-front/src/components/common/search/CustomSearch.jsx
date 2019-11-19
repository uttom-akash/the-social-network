import React, { Component } from 'react'
import {Search,Label} from 'semantic-ui-react'
import './Search.css'
import styles from './Renderer.module.css'

const resultRenderer=({userName,proPic})=><div className={styles.renderContainer}><img src={proPic}/> <label>{userName}</label> </div>;

export default class CustomSearch extends Component {
    state={
        query:'',
        isLoading:false,
    }  

    onResultSelect=(e,{result})=>this.props.selectResult(e,{result})
    

    onSearchQueryChange = (e,{value}) => {
        value=value.trim()
        this.setState({ query: value });

        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
            
                this.setState({isLoading:true})
                this.props.queryChange(value).then(res=>this.setState({isLoading:false}));
            
        },1000);
    }

    
    
    render() {
        const {query,isLoading}=this.state
        const {options}=this.props;
        return (   
        <Search
            loading={isLoading}
            onResultSelect={this.onResultSelect}
            onSearchChange={this.onSearchQueryChange}
            results={options}
            value={query}
            resultRenderer={resultRenderer}
        />
     
        )
    }
}