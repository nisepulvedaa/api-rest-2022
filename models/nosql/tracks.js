const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TrackScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

/**
 * Implementar metodo propio con relacion a storage
 */

 TrackScheme.statics.findAllData = function () {
    const joinData = this.aggregate([
      //TODO Tracks
      {
        $lookup: {
          from: "storages", //TODO Tracks --> storages
          localField: "mediaId", //TODO Tracks.mediaId
          foreignField: "_id", //TODO Straoges._id
          as: "audio", //TODO Alias!
        },
      },
      {
        $unwind: "$audio",
      }
    ]);
    return joinData;
  };


  TrackScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "storages", //TODO Tracks --> storages
          localField: "mediaId", //TODO Tracks.mediaId
          foreignField: "_id", //TODO Straoges._id
          as: "audio", //TODO Alias!
        },
      },
      {
        $unwind: "$audio",
      }
    ]);
    return joinData;
  };

TrackScheme.plugin(mongooseDelete,{overrideMethods: "all"});
module.exports = mongoose.model("tracks",TrackScheme);