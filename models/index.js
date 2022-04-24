require("dotenv").config();
const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === "nosql" ? "./nosql" : "./sql";

const models = {
    usersModel: require(`${pathModels}/users.js`),
    tracksModel: require(`${pathModels}/tracks.js`),
    storageModel: require(`${pathModels}/storages.js`)
}

module.exports = models;