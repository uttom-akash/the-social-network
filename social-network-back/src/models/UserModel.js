let mongoose=require('mongoose')
let Schema=mongoose.Schema

let userSchema=new Schema({
    userName:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    name:String,
    proPic:{type:String},
    password:String,
    role:String,
    date:{type:Date,default:Date.now},
    followers:[Schema.Types.ObjectId],
    followings:[Schema.Types.ObjectId],
    staredPost:[Schema.Types.ObjectId]
})


module.exports=mongoose.model('Users',userSchema)
