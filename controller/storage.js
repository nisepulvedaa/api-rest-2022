require("dotenv").config();
const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL  = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;


/**
 * obtener lista de la base datos!
 */
const getItems = async(req,res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    } catch (error) {
        handleHttpError(res,'Error En getItems() del controlador storage');
    }
};
/**
 * obtener el detalle del teim
 */
const getItem = async(req,res) => {
    try {
        
        req = matchedData(req);
        const {id} = req;
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res,'Error En getItem() del controlador storage');
    }
};
/**
 * crear un item
 */
const createItem = async(req,res) => {

    try {
        const {file} = req;
        const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
        const data = await storageModel.create(fileData);
        res.send({data});
    } catch (error) {
        handleHttpError(res,'Error En createItem() del controlador storage');
    }
    
};
/**
 * eliminar un item
 */
const deleteItem = async(req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        //const data = await storageModel.deleteOne({_id:id});
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteOne({_id:id});
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted:1
        }
        res.send({ data });
    } catch (error) {
        handleHttpError(res,'Error En deleteItem() del controlador storage');
    }
};

module.exports = {getItems,getItem,createItem,deleteItem};