const mongoose = require("mongoose");
const{v4 : uuidv4} = require("uuid");



const productSchema = new mongoose.Schema({
    id:{
        type : String,
        default : uuidv4,
        unique: true
    },
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


module.exports = mongoose.model("products",productSchema);