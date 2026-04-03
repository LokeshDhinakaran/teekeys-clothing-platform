import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";



const productSchema = new mongoose.Schema({
   
    title : String,
    description : String,
    category : String,
    price : Number,
    brand : String,
    sizes :[{
        size:{
            type:String,
            enum:["S","M","L","XL","XXL"],
        },
        stock: Number,
    }
    ],
    availability: String,
    thumbnail: {
        url: String,
        public_id: String
    },

    images: [{
        url: String,
        public_id: String
    }],


})

export default mongoose.model("products",productSchema);