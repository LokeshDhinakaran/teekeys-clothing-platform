import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

export default mongoose.model("user",userSchema);