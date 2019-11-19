import {LOGIN,UPDATE_PROFILE_IMAGE,UPDATE_PROFILE,FOLLOW,UNFOLLOW} from '../type/Type'
import api from '../../api/AccountManagement'

const loginAction=data=>({
    type:LOGIN,
    payload:data
})

const updateProfileImageAction=data=>({
    type:UPDATE_PROFILE_IMAGE,
    payload:data
})

const updateProfileAction=data=>({
    type:UPDATE_PROFILE,
    payload:data
})

const followAction=(data)=>({
    type:FOLLOW,
    payload:data
})

const unfollowAction=(data)=>({
    type:UNFOLLOW,
    payload:data
})

export const login=data=>dispatch=>api.login(data).then(user=>{
                                                                localStorage.setItem("user","ok")
                                                                return dispatch(loginAction(user))
                                                            }
                                                        )

export const refresh=()=>dispatch=>api.refresh().then(user=>dispatch(loginAction(user)))

export const logout=()=>dispatch=>api.logout().then(user=>{
                                                            localStorage.clear();
                                                            return dispatch(loginAction(user))
                                                    }
                                                )

export const changeProfileImage=(data)=>dispatch=>api.updateProfileImage(data).
                                                     then(resp=>dispatch(updateProfileImageAction(data)))

export const updateProfile=(data)=>dispatch=>api.update(data).then(resp=>dispatch(updateProfileAction(data)))

export const onFollow=(data)=>dispatch=>api.follow(data).then(resp=>dispatch(followAction(data)))
export const onUnfollow=(data)=>dispatch=>api.unfollow(data).then(resp=>dispatch(unfollowAction(data)))
