import React, { Component } from 'react'
import apiUser from '../../../api/UserManagement'
import UserListing from '../../common/listing/UserListing'
import accountApi from '.././../../api/AccountManagement'
import {onFollow,onUnfollow} from '../../../redux/actions/AccountAction'
import {connect} from 'react-redux'
import './Discover.css'


class DiscoverPeople extends Component {
    state={
        users:[]
    }
    componentWillMount=()=>{
        apiUser.getUsers().then(resp=>this.setState({users:resp}));
    }

    onFollow=(id,index)=>{
        this.props.onFollow({toFollowId:id}).then(resp=>{
            let user=[...this.state.users]
                user[index]['following']=true;
                this.setState({user})
        })
    }
    onUnfollow=(id,index)=>{
        this.props.onUnfollow({toUnfollowId:id}).then(resp=>{
            let user=[...this.state.users]
                user[index]['following']=false;
                this.setState({user})
        })
    }
    render() {
        return (
            <div className="discover-page">
                <div className="user-list">
                     <UserListing user={this.state.users} follow={this.onFollow} unfollow={this.onUnfollow}/>
                </div>
            </div>
        )
    }
}


export default  connect(null,{onFollow,onUnfollow})(DiscoverPeople);