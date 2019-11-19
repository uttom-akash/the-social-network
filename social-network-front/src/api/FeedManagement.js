import axios from './Axios'


export default {
    createPost:(data)=>axios.post('/api/feed/create-post',data).then(resp=>resp.data),
    updatePost:(data)=>axios.post('/api/feed/update-post',data).then(resp=>resp.data),
    starPost:(data)=>axios.post('/api/feed/star-post',data).then(resp=>resp.data),
    unstarPost:(data)=>axios.post('/api/feed/unstar-post',data).then(resp=>resp.data),
    updateStar:(data)=>axios.post('/api/feed/update-star',data).then(resp=>resp.data),
    deletePost:(data)=>axios.post('/api/feed/delete-post',data).then(resp=>resp.data),    
    getFollowingsPosts:(data,offset=0)=>axios.post(`/api/feed/get-followings-posts?offset=${offset}`,data).then(resp=>resp.data),
    getMyPosts:()=>axios.get('/api/feed/get-my-posts').then(resp=>resp.data),
    getUserPosts:(userId)=>axios.get(`/api/feed/get-user-posts?userId=${userId}`).then(resp=>resp.data),
}