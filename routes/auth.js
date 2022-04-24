const express = require("express");
const router = express.Router();
const {RegisterCtrl,LoginCtrl} = require("../controller/auth");
const {validatorRegister,validatorLogin} = require("../validators/auth");


/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Registrar un nuevo usuario"
 *          description: "Esta ruta es para registrar un nuevo usuario  en nuestra api"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: El usuario se registra de manera correcta
 *                  '403':
 *                      description: Error por alguna de las validaciones de nuestra api
 */
router.post("/register",validatorRegister,RegisterCtrl);
/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Inicio de Sesion de un usuario"
 *      description: Permite al usuario obtener un token valido para ocupar los recursos de la API
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/login",validatorLogin,LoginCtrl);

module.exports = router;