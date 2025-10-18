const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required : true,
        unique : true, // two person cannot have same short id
    },
    // original url!
    redirectURL:{
        type:String,
        required:true,
    },
    // array of objects
    visitHistory:[{
        timestamp :{
            type: Number,
        }
    }],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
} , {timestamps:true}
);
//createdBy is a reference field (like a foreign key) that stores the user’s ID and connects two collections — useful for tracking who created what.
const URL = mongoose.model("url" , urlSchema);
module.exports = URL;