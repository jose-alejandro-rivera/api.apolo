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
Object.defineProperty(exports, "__esModule", { value: true });
class ProcesoRoute {
    constructor(router) {
        this.app = router;
    }
    router() {
        this.app.get('/proceso/list', (req, res, next) => {
            try {
                console.log('services new route');
                res.status(200).json({ data: 'res data' });
            }
            catch (error) {
                console.log(error);
            }
        });
        /**
        * @swagger
        * /proceso/fake:
        *  post:
        *    tags:
        *      - Proceso
        *    name: Proceso
        *    summary: servicio que simula la respuesta de un proceso ejecutado, se reajusta en futuras integraciones
        *    parameters:
        *      -   in: body
        *          schema:
        *              type: object
        *              properties:
        *                  Id_Proceso:
        *                      description: id del proceso a ejecutar desde el paso
        *                      type: number
        *                  TipoServicio:
        *                      description: tipo del servicio a ejecutar definido en la creacion del flujo (Proceso asociado)
        *                      type: string
        *                  Servicio:
        *                      description: servicio a ejecutar (integracion ocn IVR, Registro de imagenes, Proceso de integracion)
        *                      type: string
        *              required:
        *                  - Id_Proceso
        *                  - TipoServicio
        *                  - Servicio
        *    produces:
        *      - application/json
        *    consumes:
        *      - application/json
        *    responses:
        *      '200':
        *          description: respuesta exitosa = procesos Id_Proceso ok
        *          schema:
        *              type: object
        *              properties:
        *                  status:
        *                      type: string
        *                  message:
        *                      type: string
        *      '201':
        *          description: informacion incompleta
        *
        */
        this.app.post('/proceso/fake', (req, res, next) => {
            try {
                let { Id_Proceso, TipoServicio, Servicio } = req.body;
                if (Id_Proceso && TipoServicio && Servicio) {
                    return res.status(200).json({ 'status': 200, 'message': "procesos " + Id_Proceso + " ok" });
                }
                else {
                    return res.status(201).json({ 'status': 201, 'message': "informacion incompleta" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.app.get('/proceso/fake/ok', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({ 'status': 200, 'response': "ok" });
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.default = ProcesoRoute;
