let express=require('express')
let {register,confirmEmail,reSendEmail,searchUser,removeUser,getUser,getUsers,getSpecifiedUsers}=require('../services/UserService')
let  authorize=require('../utilities/services/Authorize')
let userManagementRouter=express.Router()


userManagementRouter.post('/register',register)
userManagementRouter.post('/resend-email',reSendEmail)
userManagementRouter.get('/confirm-email',confirmEmail)
userManagementRouter.get('/search-user',authorize(['USER','ADMIN']),searchUser)
userManagementRouter.get('/get-users',authorize(['USER','ADMIN']),getUsers)
userManagementRouter.get('/get-user',authorize(['USER','ADMIN']),getUser)
userManagementRouter.post('/get-specified-users',authorize(['USER','ADMIN']),getSpecifiedUsers)
userManagementRouter.get('/remove-user',authorize(['ADMIN']),removeUser)


module.exports=userManagementRouter