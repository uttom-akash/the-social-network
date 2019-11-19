import React, { Component } from 'react'
import './CreatePost.css'
import Button from '../../common/button/Button'
import PureImageUpload from '../../common/imageUpload/PureImageUpload'
import {connect} from 'react-redux'
import FeedApi from '../../../api/FeedManagement'




class UpdatePost extends Component{
    state={
        images:[],
        description:"",
        proPic:"",
                
    }
    componentWillMount=()=>{
        const {images,description}=this.props.post
        this.setState({images,description})
    }
    componentWillReceiveProps=(nextProps)=>{
        const {images,description}=nextProps.post
        this.setState({images,description})
    }

    onFileChange=(event)=>{
        const filePicker = event.target.files[0];
        let reader=new FileReader()
        reader.readAsDataURL(filePicker)
        console.log("in file");
        
        reader.onload=(e)=>{
            let images=[...this.state.images]
            images.push(e.target.result)
            this.setState({images})
            console.log("on load");
            
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
        const {images,description}=this.state
        const {_id}=this.props.post 
        const data={postId:_id,images,description}
        this.props.onSubmit(data)
    }

    render() {
        const {images,description}=this.state
        const {proPic}=this.props.user
        
        return (
            <form className="post-card-form" style={{width:`100%`}}>
                <div className="header">
                    <label>Update Post</label>
                    <label htmlFor="post-update-upload" className="post-upload">
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
                        )
                    }
                    </div>
                }
                <div className="editor">
                    <div className="proPic" onClick={this.props.toProfile}>
                        <img src={proPic}/>
                    </div>
                    <textarea placeholder={`what's on your mind`} name="description" value={description} onChange={this.onChange}/>
                </div>
                <Button text="update" onClick={this.onSubmit} clsName="post-btn"/>
                <PureImageUpload onFileChange={this.onFileChange} clsName="post-update-upload" />
            </form>
        )
    }
}



const mapStateToProps=state=>({
    user:state.User
})
export default connect(mapStateToProps,{})(UpdatePost);