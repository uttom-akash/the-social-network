let jwt =require('jsonwebtoken')
const key="secret key"

const generateToken=(userName="",role="",id="",expires='6h')=>{
    return new Promise((resolve,reject)=>{
        jwt.sign({userName,role,id},key,{expiresIn:expires},(error,token)=>{
            if(error)reject(error);
            else resolve(token);
        })
    })
}

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,key,(error,decoded)=>{
            if(error)reject(error)
            else resolve(decoded)
        })
    })
}


module.exports={
    generateToken,
    verifyToken
}