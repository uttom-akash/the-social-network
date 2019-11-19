import React, { Component } from 'react'
import './Profile.css'
import LazyListing from '../../common/listing/LazyListing'
import Button from '../../common/button/Button'
import AccountApi from '../../../api/AccountManagement'
import userApi from '../../../api/UserManagement'
import FeedApi from '../../../api/FeedManagement'
import {Menu} from 'semantic-ui-react'
import {connect} from 'react-redux'
import UserListing from '../../common/listing/UserListing'
import {onFollow,onUnfollow} from '../../../redux/actions/AccountAction'


class ProfileAsViewer extends Component {
    state={
        proPic:"",
        userName:"",
        name:"",
        email:"",
        date:"",
        followUsers:[],
        followingUsers:[],
        staredPost:[],

        tempProPic:"",
        openedProPic:false,
        changeImage:false,
        
        modal:false,
        post:[],
        followers:[],
        followings:[],


        bottomMenu:['My Post', 'Followings','Followers'],
        activeItem:'My Post'
    }

    componentWillMount=()=>{
        const {userId}=this.props.match.params;
        userApi.getUser(userId).then(resp=>{
            const {followers,followings}=resp

            let bottomMenu=['My Post', `${!!followings && followings.length} Followings`,`${!!followers && followers.length} Followers`]
            this.setState({...resp,tempProPic:resp.proPic,bottomMenu})
            FeedApi.getUserPosts(userId).then(resp=>this.setState({post:resp.posts}))
        })
    }

    componentWillReceiveProps=(nextProps)=>{
        const {userId}=nextProps.match.params;
        userApi.getUser(userId).then(resp=>{
            const {followers,followings}=resp

            let bottomMenu=['My Post', `${!!followings && followings.length} Followings`,`${!!followers && followers.length} Followers`]
            this.setState({...resp,tempProPic:resp.proPic,bottomMenu})
            FeedApi.getUserPosts(userId).then(resp=>this.setState({post:resp.posts}))
        })   
    }



    onFollow=()=>{
        const {userId}=this.props.match.params;
        const {_id}=this.props.user
        if(userId===_id)return
        this.props.onFollow({toFollowId:userId}).then(resp=>{
            this.setState({followed:true})
        })
    }
    onUnfollow=()=>{
        const {userId}=this.props.match.params;
        this.props.onUnfollow({toUnfollowId:userId}).then(resp=>{
            this.setState({followed:false})
        })
    }

    onUnfollowFromBottomList=(id,index)=>{
        this.props.onUnfollow({toUnfollowId:id}).then(resp=>{
            let user=[...this.state.followUsers]
                user[index]['following']=false;
                this.setState({user})
        })
    }


    onFollowFromBottomList=(id,index)=>{
        const {_id}=this.props.user
        if(id===_id)return 
        this.props.onFollow({toFollowId:id}).then(resp=>{
            let user=[...this.state.followUsers]
                user[index]['following']=true;
                this.setState({followUsers:user})
        })
    }

    getViewList=()=>{
        const {post,followUsers,activeItem}=this.state
        const {user}=this.props;

        if("My Post"===activeItem){
            return  <LazyListing userId={user._id} posts={post} onUpdate={this.onUpdate}/>   
        }else{
            return <UserListing user={followUsers} unfollow={this.onUnfollowFromBottomList} follow={this.onFollowFromBottomList}/>
        }

    }

    handleItemClick = (e, { name }) =>{
        this.setState({ activeItem: name})
        const {followers,followings}=this.state      
        if(!!RegExp("followings",'i').exec(name)){
            userApi.getSpecifiedUser({userIds:followings}).then(resp=>this.setState({followUsers:resp}))
        }else if(!!RegExp("followers",'i').exec(name)){
            userApi.getSpecifiedUser({userIds:followers}).then(resp=>this.setState({followUsers:resp}))
        }
        
    }

    onUpdate=(data)=>FeedApi.updatePost(data)

    render() {
        const {proPic,userName,name,email,followed,bottomMenu,activeItem}=this.state
        return (
            <div className="profile-container">
                <div className="profile-content">
                        <div className="profile-cover">
                            <div className="pro-pic" onMouseEnter={this.onProfileHover} onMouseLeave={this.onProfileHover}>
                                <img src={proPic}/>
                            </div>        
                            <div className="user">
                                <div className="user-name">{userName}</div>
                                {
                                  followed ? 
                                  <Button text="Unfollow" clsName="custom-btn" onClick={this.onUnfollow}/>   
                                  :
                                  <Button text="Follow" clsName="custom-btn" onClick={this.onFollow}/>   
                                }
                                </div>
                        </div>
                        <div className="about-content">
                            <h4>About</h4>    
                            <div className="name"><label className="identifier">Name: </label><label>{name}</label></div>
                            <div className="email"><label className="identifier">Email: </label><label>{email}</label></div>
                        </div>
                </div>
                <div className="own-feed">
                    <Menu pointing secondary>
                            {
                                bottomMenu.map((item,index)=>
                                    <Menu.Item
                                        key={index}
                                        name={item}
                                        active={activeItem===item}
                                        onClick={this.handleItemClick}
                                    />
                                )
                            }
                    </Menu>
                    <div className="result-segment">
                        {this.getViewList()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    user:state.User
})
export default connect(mapStateToProps,{onFollow,onUnfollow})(ProfileAsViewer);