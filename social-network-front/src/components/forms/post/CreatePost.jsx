import React, { Component } from 'react'
import './CreatePost.css'
import Button from '../../common/button/Button'
import PureImageUpload from '../../common/imageUpload/PureImageUpload'
import {connect} from 'react-redux'
import FeedApi from '../../../api/FeedManagement'



const postWidth = window.innerWidth>475 ? 475 : window.innerWidth;


class CreatePost extends Component{
    state={
        images:[],
        description:"",
        focus:false,
        proPic:"",
                
    }

    onFileChange=(event)=>{
        this.setState({focus:true})
        const filePicker = event.target.files[0];
        if(!(!!filePicker))return
        
        let reader=new FileReader()
        reader.readAsDataURL(filePicker)

        reader.onload=(e)=>{
            let images=[...this.state.images]
            images.push(e.target.result)
            this.setState({focus:true,images})
        }
    }
    onPopImage=(index)=>{
        let images=[...this.state.images]
        images=images.filter((src,key)=>key!==index)
        this.setState({images})
    }

    onChange=(ev)=>this.setState({[ev.target.name]:ev.target.value})
    onSubmit=(event)=>{
        event.preventDefault()
        const {header,images,description}=this.state
        const {_id,userName,proPic}=this.props.user
        const user={userId:_id,userName,proPic}
        const data={user,header,images,description}
        this.props.onSubmit(data).then(resp=>this.setState({images:[],description:""}))
    }

    onFocus=()=>this.setState({focus:true})
    onBlur=()=>this.setState({focus:false})
    
    render() {
        const {images,focus,description}=this.state
        const {proPic}=this.props.user
        
        return (
            <form className="post-card-form" onFocus={this.onFocus} onBlur={this.onBlur} style={{width:`${postWidth}px`}}>
                <div className="header">
                    <label>Create Post</label>
                    <label htmlFor="post-upload" className="post-upload">
                            <i aria-hidden="true" class="image outline icon"></i>
                    </label>
                </div>
                
                {
                    !!images.length &&
                    <div className="images">
                    {
                        images.map((src,index)=><div> 
                                                <img src={src}/>
                                                <i aria-hidden="true" className="close icon" onClick={()=>this.onPopImage(index)} ></i>
                                            </div>
                                )}
                    </div>
                }
                <div className="editor">
                    <div className="proPic" onClick={this.props.toProfile}>
                        <img src={proPic}/>
                    </div>
                    <textarea placeholder={`what's on your mind`} name="description" value={description} onChange={this.onChange}/>
                </div>
                <Button text="post" onClick={this.onSubmit} clsName="post-btn"/>
                <PureImageUpload onFileChange={this.onFileChange} clsName="post-upload" />
            </form>
        )
    }
}



const mapStateToProps=state=>({
    user:state.User
})
export default connect(mapStateToProps,{})(CreatePost);