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
const AtencionController_1 = __importDefault(require("../../controllers/AtencionController"));
const typescript_ioc_1 = require("typescript-ioc");
class AtencionRoute {
    constructor(router) {
        this.app = router;
    }
    router() {
        /**
         * @swagger
         *
         * /api/atencion/create:
         *   post:
         *    tags:
         *      - Atencion
         *    name: CrearAtencion
         *    summary: servicio que crea una atencion nueva
         *    produces:
         *       - application/json
         *    parameters:
         *       - name: CodLogin
         *         description: Id del login correspondiente al usuario conectado
         *         required: true
         *         type: number
         *       - name: CodFlujo
         *         description: Id del flujo seleccionado
         *         required: true
         *         type: number
         *    consumes:
         *      - application/json
         *    responses:
         *      '200':
         *          description: devuelve el Id_Atencion creada para registrar las acciones de los pasos
         *          schema:
         *              type: object
         *              properties:
         *                  status:
         *                      type: number
         *                  rows:
         *                      type: object
         */
        this.app.post('/atencion/create', (req, res, next) => {
            try {
                console.log(req);
                const atencionController = typescript_ioc_1.Container.get(AtencionController_1.default);
                let responseModel = atencionController.createAtencion(req, res, next);
                return responseModel;
            }
            catch (error) {
                console.log(error);
            }
        });
        /**
         * @swagger
         *
         * /api/atencion-paso-campo/create:
         *   post:
         *    tags:
         *      - Atencion
         *    name: Crear Atnecion Paso
         *    summary: servicio que crea una atencion paso con los distintos casos , asociado a un proceso , a un cuestionario o a ninguno.
         *    produces:
         *       - application/json
         *    parameters:
         *      -   in: body
         *          schema:
         *              type: object
         *              properties:
         *                  atencionPaso:
         *                      description: informacion de basica del registro del paso
         *                      type: object
         *                      properties:
         *                          CodAtencion:
         *                             type: number
         *                          CodPaso:
         *                             type: number
         *                          Secuencia:
         *                             type: number
         *                          Soluciona:
         *                             type: number
         *                  atencionProceso:
         *                      description: informacion del procesos asociado al paso
         *                      type: object
         *                      properties:
         *                          CodProceso:
         *                             type: number
         *                          TipoServicio:
         *                             type: string
         *                          Servicio:
         *                             type: string
         *                          Request:
         *                             type: string
         *                          Response:
         *                             type: string
         *                  atencionProcesoSalida:
         *                      description: registro de la respuesta del proceso ejecutado en el paso
         *                      type: object
         *                      properties:
         *                          CodProcesoSalida:
         *                             type: number
         *                          Valor:
         *                             type: string
         *                  atencionCampo:
         *                      description: registro de los campos de un cuestionaroio asociado al paso
         *                      type: array
         *                      items:
         *                         type: object
         *                         properties:
         *                             CodCuestionarioCampo:
         *                                 type: number
         *                             ValorCampo:
         *                                 type: string
         *              required:
         *                  - atencionPaso
         *                  - atencionProceso
         *                  - atencionProcesoSalida
         *                  - atencionCampo
         *    consumes:
         *      - application/json
         *    responses:
         *      '200':
         *          description: Datos registrados
         *          schema:
         *              type: object
         *              properties:
         *                  status:
         *                      type: number
         *                  rows:
         *                      type: object
         *      '201':
         *          description: Error en los datos ingresados
         *          schema:
         *              type: object
         *              properties:
         *                  status:
         *                      type: number
         *                  rows:
         *                      type: object
         */
        this.app.post('/atencion-paso-campo/create', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const atencionController = typescript_ioc_1.Container.get(AtencionController_1.default);
                let respuesta = yield atencionController.createAtencionPasoCampo(req.body);
                res.status(200).json({ 'data': respuesta });
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.default = AtencionRoute;
