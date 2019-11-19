
const authorize=(roles=[])=>{
    return (req,res,next)=>{        
        if(!roles.includes(req.user.role))
            res.status(401).json({loggedOut:true})
        else     
            next()
    }
} 

module.exports=authorize