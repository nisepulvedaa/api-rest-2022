const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserScheme = new mongoose.Schema({
    name:{
        type: String
    },
    edad:{
        type:Number
    },
    email:{
        type:String, 
        unique:true
    },
    password:{
        type:String
    },
    roles:{
        type:["user","admin"], 
        default: "user",
    }
},
{
    timestamps:true,
    versionKey:false
}
);
UserScheme.plugin(mongooseDelete,{overrideMethods: "all"});
module.exports = mongoose.model("users", UserScheme)