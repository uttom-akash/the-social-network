let Users=require('../models/UserModel')
let sendMailAsync=require('../utilities/services/Mail')


const register=async (req,res)=>{
    const {user}=req.body

    let userModel=new Users({...user})
    userModel.save()
    .then(async dbResp=>{
        let emailResp=await sendConfirmationEmail(dbResp.id,user.email)
        res.status(201).json({user:dbResp,status:emailResp})
    })
    .catch(err=>res.status(405).json({err}))    
}

const reSendEmail=async (req,res)=>{
    const {email,password}=req.body
    let user=await Users.findOne({email:email,password:password})
                        .select({_id:1,role:1,userName:1,name:1,email:1,date:1,followers:1,followings:1,staredPost:1,proPic:1})
    if(user===null)res.status(404).send("no recognised")

    let emailResp=await sendConfirmationEmail(user._id,email)
    res.status(201).json({user:dbResp,status:emailResp})
    
        
}


const confirmEmail=async (req,res)=>{
    const {id,code}=req.query
    if(code!=='akash')res.status(401).send("unauthorized")

    let user=await Users.findById(id).exec()
    if(user===null)res.status(404).send("sorry no user")
    let dbResp=await Users.updateOne({_id:id},{role:"USER"})
    res.json(dbResp.nModified)
}

const searchUser=async(req,res)=>{  
    let {name}=req.query
    let users=await Users.find().where('userName').regex(new RegExp(`^${name}.*`, "i")).skip(0).limit(20).select({_id:1,proPic:1,userName:1}).exec()
    res.json([...users])
}

const getUser=async (req,res)=>{
    const {userId}=req.query

    const {id}=req.user
    let user=await Users.find({_id:userId}).limit(1);
    let followings=await Users.findById(id).select({followings:1})
    
    followings=followings.followings
    let resp={}
    if(user.length>0)
        {
            resp={...user[0]}
            resp=resp._doc
        }
    
    if(followings.includes(resp._id))
    {     
        resp.followed=true
    }
    else
    {
        resp.followed=false
    } 
    res.json(resp)
}


const getUsers=async (req,res)=>{
    const {offset,limit}=req.query
    
    const {id}=req.user
    let users=await Users.find({_id:{$ne:req.user.id}}).select({_id:1,proPic:1,userName:1})
    let followings=await Users.findById(id).select({followings:1})
    followings=followings.followings

    let resp=users.map(user=>{
        let modUser={...user}
        modUser=modUser._doc
        if(followings.includes(user._id))
            {     
                modUser.following=true
            }
        else
            {
                modUser.following=false
            } 
            return modUser
                
    })
    

    res.json([...resp])
}

const getSpecifiedUsers=async (req,res)=>{
    const {userIds}=req.body
    
    let users=await Users.find({_id:{$in:userIds}}).select({_id:1,proPic:1,userName:1})
    let followings=await Users.findById(req.user.id).select({followings:1})
    followings=followings.followings
    
    let resp=users.map(user=>{
        let modUser={...user}
        modUser=modUser._doc
        if(followings.includes(user._id))
            {     
                modUser.following=true
            }
        else
            {
                modUser.following=false
            } 
            return modUser
                
    })
    res.json([...resp])
}


const removeUser=async (req,res)=>{
    const {id}=req.query
    let resp=await Users.deleteOne({_id:id})
    res.json({resp})
}

module.exports={
    register,
    confirmEmail,
    reSendEmail,
    searchUser,
    removeUser,
    getUser,
    getUsers,
    getSpecifiedUsers
}



//utill

const sendConfirmationEmail=async(id,email)=>{
    return await sendMailAsync(to=email,link=`http://localhost:3000/confirm-email/${id}/akash`)
}
