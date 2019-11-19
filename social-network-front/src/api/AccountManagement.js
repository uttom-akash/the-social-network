import axios from './Axios'


export default {
    login:(data)=>axios.post('/api/account/login',data).then(resp=>resp.data.user),
    refresh:()=>axios.get('/api/account/refresh').then(resp=>resp.data.user),
    logout:()=>axios.get('/api/account/logout').then(resp=>resp.data),
    update:(data)=>axios.post('/api/account/update',data).then(resp=>resp.data),
    updateProfileImage:(data)=>axios.post('/api/account/update-profile-image',data).then(resp=>resp.data),
    getProfileImage:()=>axios.get('/api/account/get-profile-image').then(resp=>resp.data),
    
    follow:(data)=>axios.post('/api/account/follow',data).then(resp=>resp.data),
    unfollow:(data)=>axios.post('/api/account/unfollow',data).then(resp=>resp.data),
    followers:()=>axios.get('/api/account/followers').then(resp=>resp.data),
    followings:()=>axios.get('/api/account/followings').then(resp=>resp.data),
    staredPost:()=>axios.get('/api/account/stared-post').then(resp=>resp.data),
}