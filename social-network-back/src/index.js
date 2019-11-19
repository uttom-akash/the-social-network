let express=require('express')
let cookieParser = require('cookie-parser')
let bodyParser=require('body-parser')
let mongoose=require('mongoose')
let path=require('path')
require('dotenv').config()
let {verifyToken}=require('./utilities/services/JwtService')
let userManagementRouter=require('./controllers/UserManagement')
let accountManagementRouter=require('./controllers/AccountManagement')
let feedManagement=require('./controllers/FeedManagement')

// express app
let app=express()

//util middleware
app.use(express.json({ limit: "25mb" }))
app.use(cookieParser())
app.use(bodyParser())
// app.use('/static',express.static(path.join(__dirname,'/uploads')))

app.use(async (req,res,next)=>{
    try {
        let token=req.cookies.token
        let payload=await verifyToken(token)
        console.log(payload);
        
        req.user={}
        req.user.userName=payload.userName
        req.user.role=payload.role
        req.user.id=payload.id  

    } catch (error) {   
        req.user={}
        req.user.userName=""
        req.user.role="" 
        req.user.id="" 
    }
    next()
})

app.use('/static',(req,res,next)=>{
    if(req.user.id.length>10)
        next();
    else     
        res.status(401).send("Unauthorized")
},express.static(path.join(__dirname,'/uploads')))


//routes middleware
app.use('/api/user',userManagementRouter)
app.use('/api/account',accountManagementRouter)
app.use('/api/feed',feedManagement)


let port=8080

//listen
app.listen(port,()=>{
    console.log(`listening on ${port}`);
})

mongoose.connect("mongodb://127.0.0.1:27017/socialdb",{useNewUrlParser:true,useUnifiedTopology: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>{
    console.log("mongo connected");
});