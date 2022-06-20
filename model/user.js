const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const user=new new_schema({
    username:{
        required:false,
        type:String
    },
    password:{
        required:false,
        type:String
    }
    , email:{
        required:false,
        type:String
    },
    
    fname:{
        required:false,
        type:String
    }
},{versionKey:false})
const user_mod=mongoose.model('users',user)
module.exports=user_mod