const {handleHttpError} =  require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const {usersModel} = require("../models");
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();

const authMiddleware = async(req,res,next) => {  

    try {
        if(!req.headers.authorization){
            handleHttpError(res,"No ha facilitado un token de autentificación", 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop(); //Bearer 3333
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res,"Usted ha facilitado un token que no es generado por esta api", 401);
            return;
        }

        const query = {
            [propertiesKey.id]:dataToken[propertiesKey.id]
        }
        
        //const user = await usersModel.findById(dataToken[propertiesKey.id]);
        //se cambia ejecucion del metodo por un metodo standard
        const user = await usersModel.findOne({query});
        req.user = user;
        next();

    } catch (e) {
        handleHttpError(res, "No Posee una Sesion Valida", 401);
    }

}


module.exports = authMiddleware;