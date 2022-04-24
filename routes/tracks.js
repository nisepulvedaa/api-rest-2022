const express = require('express');
const router = express.Router();
const customHeader = require("../middleware/customHeader");
const {validatorCreateItem,validatorGetItem} = require("../validators/tracks");
const {getItems,getItem,createItem,updateItem,deleteItem} = require("../controller/tracks");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/role");
//TODO http://localhost/tracks GET, POST, DELETE, PUT

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Listar las canciones credas por nuestra API"
 *      description: Obten todas las listas de las canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las canciones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",authMiddleware, getItems);
/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Permite obtener el detalle de una canción (se le debe facilitar el Id de la canción)"
 *      description: Obten el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id",authMiddleware,validatorGetItem ,getItem);
/**
 * Register new track
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Permite Ingresar una Canción"
 *      description: Registra una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/",authMiddleware,checkRol(["user","admin"]),validatorCreateItem, createItem);
/**
 * Update track
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Permite actualizar los campos de una Canción Ingresada (se le debe facilitar el Id de la canción)"
 *      description: Actualiza una cancion y obtener el detalle del registro
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/track'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.put("/:id",authMiddleware,validatorGetItem ,validatorCreateItem,updateItem);
/**
 * Delete track
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Permita Eliminar una canción (se le debe facilitar el Id de la canción) , (este es un borrado no logico es decir se elimina el archivo pero aun podemos verlo en nuesta BD)"
 *      description: Elimiar el detalle de una cancion
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de canción a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la cancion.
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id",authMiddleware,validatorGetItem ,deleteItem);

module.exports = router;