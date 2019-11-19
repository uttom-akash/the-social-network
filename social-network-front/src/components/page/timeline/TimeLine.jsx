import React, { Component } from 'react'
import './TimeLine.css'
import LazyListing from '../../common/listing/LazyListing'
import Activity from '../../common/activity/Activity'
import CreatePost from '../../forms/post/CreatePost'
import {connect} from 'react-redux'
import FeedApi from '../../../api/FeedManagement'


class TimeLine extends Component {
    state={
        openStar:false,
        posts:[]
    }

    componentWillMount=()=>{
        const {user}=this.props;
        FeedApi.getFollowingsPosts({followings:user.followings}).then(resp=>this.setState({posts:resp.posts}))
    }

    componentWillReceiveProps=(nextProps)=>{
        const {user}=nextProps;
        FeedApi.getFollowingsPosts({followings:user.followings}).then(resp=>this.setState({posts:resp.posts}))
    
    }

    toProfile=()=>this.props.history.push('/profile')
    
    onSubmit=(data)=>{
        let posts=[...this.state.posts]
        posts.unshift({...data,totalStars:0,myIndex:-10,date:new Date(),ratings:[]})
        return FeedApi.createPost(data).then(resp=>this.setState({posts}))
    }
    
    onUpdate=(data)=>FeedApi.updatePost(data)
    


    render() {
        const {posts}=this.state
        const {user}=this.props;
        return (
            <div className="timeline">
                <div className="post">
                    <CreatePost onSubmit={this.onSubmit} toProfile={this.toProfile}/>
                    <LazyListing userId={user._id} posts={posts} onUpdate={this.onUpdate}/>
                </div>
            </div>

        )
    }
}

const mapStateToProps=state=>({
    user:state.User
})
export default connect(mapStateToProps,{})(TimeLine);