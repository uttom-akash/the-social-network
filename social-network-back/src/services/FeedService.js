let Post=require('../models/PostModel')
let {writeToMemory}=require('../utilities/services/FileUpload')

const createPost=async (req,res)=>{
    const {user,header,images,description}=req.body
    console.log(user);
    
    let imageLinks=await writeToMemory(images)
    let post=new Post({
        user,
        header,
        images:imageLinks,
        description,
        ratings:[]
    })
    
    post.save().then(dbResp=>res.status(201).json({status:'created'})).catch(err=>res.status(400).json({err}))
}

const updatePost= async (req,res)=>{
    const {postId,images,description}=req.body
    Post.updateOne({_id:postId},{images:images,description:description}).then(dbResp=>res.json(dbResp)).catch(errResp=>res.status(400).json({errResp}))

}


const starPost=(req,res)=>{
    const {postId,rating}=req.body
    Post.findOneAndUpdate({_id:postId},{'$push':{ratings:rating}},{new: true}).then(post=>res.json(post))
}

const unstarPost=(req,res)=>{
    const {postId,userId}=req.body
    Post.updateOne({_id:postId},{'$pull':{ratings:{'userId':userId}}}).then(resp=res.json({modfied:true})).catch(errResp=>res.status(400).json({errResp}))
}

const updateStar=(req,res)=>{
    const {postId,rating}=req.body
    Post.findOneAndUpdate({"_id":postId,"ratings.userId":rating.userId},{$set:{"ratings.$":rating}}).then(resp=>res.json(resp))
}

const deletePost=(req,res)=>{
    const {postId}=req.query
    Post.deleteOne({_id:postId}).then(dbResp=>res.json(dbResp)).catch(errResp=>res.status(400).json({errResp}))
}


const getFollowingsPosts=async (req,res)=>{
    let {followings}=req.body;
    const {offset}=req.query

    if(!!followings===false)
        followings=[]
    followings.push(req.user.id)
    
    let posts =await Post.find({'user.userId':{$in:followings}}).skip(parseInt(offset)).limit(30).sort({date:-1})
    
    posts=posts.map(post=>{
        let modifiedPost=post._doc
        let ratings=modifiedPost.ratings 
        let flag=-10;
        let totalStars=0;
        
        ratings.map((star,index)=>{
            if(star.userId+""===req.user.id+"")
                flag=index 
            totalStars+=star.numberOfStars;
        })
        
        modifiedPost.totalStars=totalStars;
        modifiedPost.myIndex=flag;
        return modifiedPost

    })
    res.json({posts})

}

const getMyPosts=async (req,res)=>{
    const {offset}=req.query
    let posts =await Post.find({'user.userId':req.user.id}).skip(offset).limit(30).sort({date:-1})
                                               
    posts=posts.map(post=>{
        let modifiedPost=post._doc
        let ratings=modifiedPost.ratings 
        let flag=-10;
        let totalStars=0;
        
        ratings.map((star,index)=>{
            if(star.userId+""===req.user.id+"")
                flag=index 
            totalStars+=star.numberOfStars;
        })
        
        modifiedPost.totalStars=totalStars;
        modifiedPost.myIndex=flag;
        return modifiedPost

        })
    res.json({posts})
    
}

const getUserPosts= async (req,res)=>{
    const {userId}=req.query
    let posts=await Post.find({'user.userId':userId}).sort({date:-1})

    posts=posts.map(post=>{
        let modifiedPost=post._doc
        let ratings=modifiedPost.ratings 
        let flag=-10;
        let totalStars=0;
        
        ratings.map((star,index)=>{
            if(star.userId+""===req.user.id+"")
                flag=index 
            totalStars+=star.numberOfStars;
        })
        
        modifiedPost.totalStars=totalStars;
        modifiedPost.myIndex=flag;
        return modifiedPost

        })
        
    res.json({posts})
}

module.exports={
    createPost,
    updatePost,
    starPost,
    unstarPost,
    updateStar,
    deletePost,
    getFollowingsPosts,
    getMyPosts,
    getUserPosts
}