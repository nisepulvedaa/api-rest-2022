const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * obtener lista de la base datos!
 */
const getItems = async(req,res) => {

    try {
        const user = req.user;
        const data = await tracksModel.findAllData({});
        user.set('password',undefined, {strict:false});
        res.send({ data,user });
    } catch (error) {
        handleHttpError(res,'Error En getItems() del controlador tracks');
    }

   
};
/**
 * obtener el detalle del teim
 */
const getItem = async(req,res) => {

    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res,'Error En getItem() del controlador tracks');
    }

};
/**
 * crear un item
 */
const createItem = async(req,res) => {

    try {

        //const body = req.body;
        //const bodyClean = matchedData(req); 
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({data});
    } catch (error) {
        handleHttpError(res,'Error En createItem() del controlador tracks');
    }

    
};
/**
 * actualizar un item
 */
const updateItem = async(req,res) => {

    try {
        //const body = matchedData(req);
        const {id,...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body, { new: true, runValidators: true });
        res.send({data});
    
    } catch (error) {
        handleHttpError(res,'Error En updateItem() del controlador tracks');
    }


};
/**
 * eliminar un item
 */
const deleteItem = async(req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        //const data = await tracksModel.deleteOne({_id:id});
        const data = await tracksModel.delete({_id:id});
        res.send({ data });
    } catch (error) {
        handleHttpError(res,'Error En deleteItem() del controlador tracks');
    }
};

module.exports = {getItems,getItem,createItem,updateItem,deleteItem};