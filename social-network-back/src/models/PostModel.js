let mongoose=require('mongoose')
let Schema=mongoose.Schema

let postSchema=new Schema({
    user:{
        userId:{type:String,required:true},
        userName:{type:String,required:true},
        proPic:{type:String}
    },
    header:{type:String},
    images:[{type:String}],
    description:{type:String},
    date:{type:Date,default:Date.now},
    ratings:[
        {
            userId:{type:Schema.Types.ObjectId},
            numberOfStars:{type:Number}
        }
    ]
})


module.exports=mongoose.model('Post',postSchema)