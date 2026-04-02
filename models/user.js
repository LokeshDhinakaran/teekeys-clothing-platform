const mongoose = require("mongoose")
const{v4 : uuidv4} = require("uuid");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minLength:3,
        trim:true,
    },
    email:String,
    password:String,
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        } 
    ],
    picture:String,
    contact:Number,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

module.exports = mongoose.model("user",userSchema)