const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const StorageScheme = new mongoose.Schema({
    url:{
        type: String
    },
    filename:{
        type:String
    }
},
{
    versionKey:false,
    timestamps: true
}
);
StorageScheme.plugin(mongooseDelete,{overrideMethods: "all"});
module.exports = mongoose.model("storages", StorageScheme)