import React, { Component } from 'react'
import './CustomPost.css'
import Star from '../star/Star'
import {getDateTime} from '../date/DateFormat'
import {withRouter} from 'react-router-dom'
import EditPost from '../floating/FloatingFragment'
import UpdatePost from '../../forms/post/UpdatePost'

class CustomPost extends Component {

    constructor(props){
        super(props)
        this.state={
            openStar:false,
            post:{},
            imageIndex:0,
            imageLength:0,
            editPost:false
        }
    }
    
    componentWillMount=()=>{
        const {post}=this.props
        this.setState({post,imageLength:post.images.length})
    }

    componentWillReceiveProps=(nextProps)=>{
        const {post}=nextProps
        this.setState({post,imageLength:post.images.length})
    }

    onRate=()=>this.setState({openStar:!this.state.openStar})


    
    handleRating=(e, { rating, maxRating })=>{
        this.props.onStar(rating);
        this.onRate();
    }

    onUnstar=()=>{
        this.props.onUnstar()
    }

    onLeaveStar=()=>this.setState({openStar:false})
    
    rotateImage=(increment)=>{
        let {imageLength,imageIndex}=this.state
        let newIndex=imageIndex+increment
        
        if(0<=newIndex && newIndex<imageLength)
            this.setState({imageIndex:newIndex})
    }


    onClick=(path)=>this.props.history.push(path)

    toggleEditPost=()=>this.setState({editPost:!this.state.editPost})
    onUpdate=(data)=>
    {
        this.props.onUpdate(data)
        this.toggleEditPost()
    }
    render() {
         const {measure,userId} =this.props
         const {openStar,post,imageIndex,imageLength,editPost}=this.state
        
            return (
                <div className="post-card">
                    <div className="post-card-user">
                        <div className="post-user-pic" onClick={()=>this.onClick(`/profile-view/${post.user.userId}`)}>
                            <img src={post.user.proPic}  onLoad={measure}/>
                        </div>
                        <div className="post-user-name">
                            <label>{post.user.userName}</label>
                        </div>
                        {
                           userId===post.user.userId && 
                                <div className="edit-control" onClick={this.toggleEditPost}>
                                    <i aria-hidden="true" class="edit icon"></i>
                                </div>
                        }
                    </div>
                    {
                        !!imageLength && 
                        
                        <div className="post-image">
                            {imageLength>1 && <label className="image-index">{imageIndex+1}/{imageLength}</label>}
                            {imageIndex>0 && <label className="rotate-image-left" onClick={()=>this.rotateImage(-1)}>
                                                 <i aria-hidden="true" class="arrow circle left icon"></i>
                                            </label>
                            }
                                    <img src={post.images[imageIndex]} onLoad={measure}/>

                            {imageIndex<imageLength-1 && <label className="rotate-image-right" onClick={()=>this.rotateImage(+1)}><i aria-hidden="true" class="arrow circle right icon"></i>
                                                        </label>
                                                    }
                        </div>
                    }
                    <div className="post-content">
                        <div className="header">{post.header}</div>
                        <div className="description">{post.description}</div>
                    </div>
                    <div class="post-feature">
                        {
                            openStar?
                            <Star onLeaveStar={this.onLeaveStar} onRate={this.handleRating}/>
                            :
                            <div className="count-star">
                                <label>{post.totalStars}</label>
                                {post.myIndex>=0 && <label className="mystar">({post.ratings[post.myIndex].numberOfStars})</label>}
                                {
                                    post.myIndex>=0 ?
                                    <a onClick={this.onUnstar} className="stared"><i aria-hidden="true" class="star outline icon"></i></a>
                                    :
                                    <a onClick={this.onRate}><i aria-hidden="true" class="star outline icon"></i></a>
                                }
                            </div>                                
                        }
                    </div>
                    <div class="extra-content">
                        <div class="meta"><span class="date">{getDateTime(post.date)}</span></div>
                    </div>
                    <EditPost open={editPost} onClose={this.toggleEditPost}>
                        <UpdatePost onSubmit={this.onUpdate} post={post}/>
                    </EditPost>
                </div>
             )
    }
}

export default  withRouter(CustomPost)

