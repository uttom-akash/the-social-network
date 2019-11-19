import {LOGIN,UPDATE_PROFILE_IMAGE,UPDATE_PROFILE,FOLLOW,UNFOLLOW} from '../type/Type'

export default (state={},action={})=>{
    switch(action.type){
        case LOGIN:return action.payload;
        case UPDATE_PROFILE_IMAGE : return {...state,proPic:action.payload.profileImage}
        case UPDATE_PROFILE :return {...state,name:action.payload.name}
        case FOLLOW :return {...state,followings:state.followings.concat(action.payload.toFollowId)}
        case UNFOLLOW :return {...state,followings:state.followings.filter(id=>id!==action.payload.toUnfollowId)}
        default :return state
    }
}