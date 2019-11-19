let express=require('express')
let {createPost,updatePost,starPost,unstarPost,updateStar,deletePost,getFollowingsPosts,getMyPosts,getUserPosts}=require('../services/FeedService')
let  authorize=require('../utilities/services/Authorize')

let feedManagementRouter=express.Router()

feedManagementRouter.post('/create-post',authorize(['USER','ADMIN']),createPost)
feedManagementRouter.post('/update-post',authorize(['USER','ADMIN']),updatePost)
feedManagementRouter.post('/star-post',authorize(['USER','ADMIN']),starPost)
feedManagementRouter.post('/unstar-post',authorize(['USER','ADMIN']),unstarPost)
feedManagementRouter.post('/update-star',authorize(['USER','ADMIN']),updateStar)
feedManagementRouter.post('/delete-post',authorize(['USER','ADMIN']),deletePost)
feedManagementRouter.post('/get-followings-posts',authorize(['USER','ADMIN']),getFollowingsPosts)
feedManagementRouter.get('/get-my-posts',authorize(['USER','ADMIN']),getMyPosts)
feedManagementRouter.get('/get-user-posts',authorize(['USER','ADMIN']),getUserPosts)


module.exports=feedManagementRouter