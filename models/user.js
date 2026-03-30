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
            default:mongoose.Schema.Types.ObjectId,
            ref:"products"
        } 
    ],
    picture:String,
    contact:Number

})

module.exports = mongoose.model("user",userSchema)