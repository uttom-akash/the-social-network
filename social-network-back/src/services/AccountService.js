let {generateToken}=require('../utilities/services/JwtService')
let Users=require('../models/UserModel')
let {uploadProfileImage}=require('../utilities/services/FileUpload')

const login=async (req,res)=>{
    const {email,password}=req.body
    let user=await Users.findOne({email:email,password:password})
                        .select({_id:1,role:1,userName:1,name:1,email:1,date:1,followers:1,followings:1,staredPost:1,proPic:1})
    if(user===null)res.status(404).send("no recognised")
    
    let token=await generateToken(userName=user.userName,role=user.role,id=user.id)
    res.cookie("token",token,{maxAge:1000*60*60*6,httpOnly:true})
    res.json({user})
}

const refresh=async (req,res)=>{
    let user=await Users.findById(req.user.id)
                        .select({_id:1,role:1,userName:1,name:1,email:1,date:1,followers:1,followings:1,staredPost:1,proPic:1})
    if(user===null)res.status(404).send("you are not a vaild user")
    res.json({user})
}


const logout=async (req,res)=>{
    console.log("logout");
    
    const {userName,role,id}=req.user
    let token=await generateToken(userName,role,id,'0s')
    res.cookie("token",token,{maxAge:0,httpOnly:true})
    res.json({})
}

const updateProfileImage=async (req,res)=>{
    const {profileImage}=req.body

    let user=await Users.findOne({_id:req.user.id})
    if(user===null)res.status(404).send("you are not valid user")

    let link=await uploadProfileImage(profileImage,req.user.id);
    
    user.proPic=link;
    let dbResp=await Users.replaceOne({_id:req.user.id},user)
    res.json(dbResp)
}


const update=async (req,res)=>{
    const {userName,name,password,newPassword}=req.body
    let user=await Users.findOne({_id:req.user.id,password:password}).exec()
    if(user===null)res.status(404).send("ypu are not valid user")

    if(!!userName && userName.length>0)user.userName=userName
    if(!!name && name.length>0)user.name=name
    if(!!newPassword && newPassword.length>0)user.password=newPassword

    let dbResp=await Users.replaceOne({_id:req.user.id},user)
    res.json(dbResp)
}

const follow=async (req,res)=>{
    const {toFollowId}=req.body
    let dbResp={}
    dbResp.resp1=await Users.updateOne({_id:req.user.id},{"$push":{followings:toFollowId}})
    dbResp.resp2=await Users.updateOne({_id:toFollowId},{"$push":{followers:req.user.id}})
    res.json({dbResp})
}

const unfollow=async (req,res)=>{
    const {toUnfollowId}=req.body
    
    let dbResp={}
    dbResp.resp1=await Users.updateOne({_id:req.user.id},{$pull:{followings:toUnfollowId}})
    dbResp.resp2=await Users.updateOne({_id:toUnfollowId},{$pull:{followers:req.user.id}})

    res.json({dbResp})
}

const staredPost=async (req,res)=>{
    let posts=await Users.find({_id:req.user.id}).select({staredPost:1,_id:0})
    res.json({posts})
}

//const unstaredPost=async (req,res)=>{
//    const {unstaredPostId}=req.body
//    let dbResp=await Users.updateOne({_id:req.user.id},{"$pull":{staredPost:unstaredPostId}})
//    res.json({dbResp})
//}

const GetAllFollowers=async (req,res)=>{
    let user=await Users.findById(req.user.id).select({followers:1,_id:0})
    let {followers}=user
    console.log(followers);
    
    let followersDetails=await Users.find({_id:{$in:followers}})

    res.json(followersDetails)
}

const GetAllFollowings=async (req,res)=>{
    let user=await Users.findById(req.user.id).select({followings:1,_id:0})
    let {followings}=user
    console.log(followings);
    
    let followersDetails=await Users.find({_id:{$in:followings}})

    res.json(followersDetails)
}

module.exports={
    login,
    refresh,
    logout,
    update,
    follow,
    unfollow,
    staredPost,
    GetAllFollowers,
    GetAllFollowings,
    updateProfileImage
}
