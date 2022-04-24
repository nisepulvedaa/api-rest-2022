const {handleHttpError} = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */

const checkRol = (roles) => (req,res,next) => {
    try {
        const {user} = req;
        //console.log({user});
        const rolesByUser = user.roles; //["user"]
        //["admin","manager"]
        const checkValueRol = roles.some((rolsingle) => rolesByUser.includes(rolsingle)); //devuelve booleano true o false
        if(!checkValueRol){
            handleHttpError(res, "El usuario no tiene permiso paraa acceder a este recurso",403);
            return;
        }
        
        next();
    } catch (e) {
        handleHttpError(res, "No posee los permisos necesarios para acceder a el metodo solicitado",403);
    }

}

module.exports = checkRol;