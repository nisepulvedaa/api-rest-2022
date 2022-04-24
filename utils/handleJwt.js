const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require('./handlePropertiesEngine');
const propertiesKey = getProperties();
/**
 * Debes de pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = (user) => {  

    const sign =  jwt.sign(
        {
            //para mysql debe ser id para mongo db _id
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.roles
        },
        JWT_SECRET,{
            expiresIn: "2h",
        }
    );
    return sign;


}
/**
 * Debes de pasar el token se session el JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async(tokenJwt) => {

    try{
        return jwt.verify(tokenJwt, JWT_SECRET);
    }catch(e){
        return null;
    }

};

module.exports = {tokenSign, verifyToken}