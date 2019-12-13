"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FlujoController_1 = __importDefault(require("../../controllers/FlujoController"));
const typescript_ioc_1 = require("typescript-ioc");
class FlujoRouter {
    constructor(router) {
        this.app = router;
    }
    router() {
        /**
            * @swagger
            * /api/flujo/list/:id:
            *  get:
            *    tags:
            *      - Flujo
            *    name: Lista de Flujos
            *    summary: servicio retorna listado de los pasos asociados a un flujo creado.
            *    parameters:
            *      - in: path
            *        name: Id
            *        type: integer
            *        required: true
            *        description: numero de id del flujo a filtrar
            *    produces:
            *      - application/json
            *    consumes:
            *      - application/json
            *    responses:
            *      '200':
            *          description: objeto con un array de pasos asociados al flujo
            *          schema:
            *              type: object
            *              properties:
            *                  status:
            *                      type: number
            *                  rows:
            *                      type: object
            *      '201':
            *          description: error en la consulta a la BD
            *
            */
        this.app.get('/flujo/list/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getSteps(req.params.id);
                res.status(200).json(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
        /**
            * @swagger
            * /api/flujos/por/categorias/:id_categoriaFlujo:
            *  get:
            *    tags:
            *      - Flujo
            *    name: Lista de flujo filtrados por categoria
            *    summary: servicio retornaLista de flujo asociados a una misma categoria de flujo
            *    parameters:
            *      - in: path
            *        name: IdCategoriaFlujo
            *        type: integer
            *        required: true
            *        description: numero de id de la categoria flujo
            *    produces:
            *      - application/json
            *    consumes:
            *      - application/json
            *    responses:
            *      '200':
            *          description: objeto con un array de flujos asociados a la categoria
            *          schema:
            *              type: object
            *              properties:
            *                  status:
            *                      type: number
            *                  rows:
            *                      type: object
            *      '201':
            *          description: error en la consulta a la BD
            *
            */
        this.app.get('/flujos/por/categorias/:id_categoriaFlujo', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getFlujoPorCategoria(req.params.id_categoriaFlujo);
                res.status(200).send(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
        /**
            * @swagger
            * /api/flujo/categorias:
            *  get:
            *    tags:
            *      - Flujo
            *    name: Lista de categorias de flujo
            *    summary: servicio retorna lista de categorias de flujo existentes
            *    produces:
            *      - application/json
            *    consumes:
            *      - application/json
            *    responses:
            *      '200':
            *          description: objeto con un array de las categorias
            *          schema:
            *              type: object
            *              properties:
            *                  status:
            *                      type: number
            *                  rows:
            *                      type: object
            *      '201':
            *          description: error en la consulta a la BD
            *
            */
        this.app.get('/flujo/categorias', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getCategoriaFlujo(req, res, next);
                res.status(200).send(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.default = FlujoRouter;
