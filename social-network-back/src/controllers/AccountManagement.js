let express=require('express')
let {login,refresh,logout,updateProfileImage,update,follow,unfollow,staredPost,GetAllFollowers,GetAllFollowings}=require('../services/AccountService')
let  authorize=require('../utilities/services/Authorize')

let accountManagementRouter=express.Router()

accountManagementRouter.post('/login',login)
accountManagementRouter.get('/refresh',authorize(['USER','ADMIN']),refresh)
accountManagementRouter.get('/logout',authorize(['USER','ADMIN']),logout)
accountManagementRouter.post('/update',authorize(['USER','ADMIN']),update)
accountManagementRouter.post('/update-profile-image',authorize(['USER','ADMIN']),updateProfileImage)
accountManagementRouter.post('/follow',authorize(['USER','ADMIN']),follow)
accountManagementRouter.post('/unfollow',authorize(['USER','ADMIN']),unfollow)
accountManagementRouter.get('/followers',authorize(['USER','ADMIN']),GetAllFollowers)
accountManagementRouter.get('/followings',authorize(['USER','ADMIN']),GetAllFollowings)


accountManagementRouter.get('/stared-post',authorize(['USER','ADMIN']),staredPost)
//accountManagementRouter.post('/unstared-post',authorize(['USER','ADMIN']),unstaredPost)



module.exports=accountManagementRouter
