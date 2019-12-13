"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const typescript_ioc_1 = require("typescript-ioc");
const AtencionDAO_1 = require("../DAO/AtencionDAO");
let AtencionController = class AtencionController {
    constructor(AtencionDAO) {
        this.AtencionDAO = AtencionDAO;
    }
    /**
     * Crear atencion luego de haber seleccioando el flujo a ejecutar.
     *
     * @param {Request} req  request que contiene el codigo del flujo y codigo de login de usuario
     * @param {Response} res respuesta como 200 o 201
     * @param {NextFunction} next funcion next
     * @returns {Promise}
     */
    createAtencion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { CodLogin, CodFlujo } = req.body;
                const validation = yield this.AtencionDAO.validateAtencion(CodLogin, CodFlujo);
                if (validation) {
                    const result = yield this.AtencionDAO.createAtencion(req.body);
                    return res.status(200).json(result);
                }
                else {
                    return res.status(201).json({ 'status': 201, 'response': "informacion incompleta" });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /* Metodo que recibe los datos del formulario */
    createAtencionPasoCampo(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let validation;
            let idAtnPaso;
            let data;
            let validacionCampos;
            let valAtencionCampo;
            try {
                const { CodAtencion, CodPaso, Secuencia, Soluciona } = request[0].atencionPaso;
                const { CodAtencionPaso, CodProceso, TipoServicio, Servicio, Request, Response } = request[0].atencionProceso;
                const { CodCuestionarioCampo, ValorCampo } = request[0].atencionCampo;
                if (CodAtencion != '' && CodPaso != '') {
                    validation = yield this.AtencionDAO.createAtencionPasoCampo(request[0].atencionPaso, request[0].atencionProceso, request[0].atencionProcesoSalida, request[0].atencionCampo);
                    idAtnPaso = validation;
                }
                else {
                    return this.validadorMsgError(201);
                }
                //Valida que todos los campos de los objetos esten llenos
                validacionCampos = yield this.validarInsert(request[0].atencionProceso);
                if (request[0].atencionProceso) {
                    if (CodAtencionPaso != '' &&
                        CodProceso != '' &&
                        TipoServicio != '' &&
                        Servicio != '' &&
                        Request != '' &&
                        Response != '') {
                        let idProceso = yield this.AtencionDAO.createAtencionProceso(idAtnPaso, request[0].atencionProceso, request[0].atencionProcesoSalida);
                    }
                    else if (CodAtencionPaso == '' &&
                        CodProceso == '' &&
                        TipoServicio == '' &&
                        Servicio == '' &&
                        Request == '' &&
                        Response == '') {
                    }
                    else {
                        return this.validadorMsgError(201);
                    }
                }
                valAtencionCampo = yield this.validarArrayAtencionCampo(request[0].atencionCampo);
                //Valida que los objetos atencionPaso y atencionCampo esten llenos
                if (request[0].atencionCampo) {
                    if (valAtencionCampo == 1) {
                        validation = yield this.AtencionDAO.createAtencionCampo(request[0].atencionCampo, idAtnPaso);
                    }
                    else if (valAtencionCampo == 2) {
                        return this.validadorMsgError(201);
                    }
                }
                return this.validadorMsgError(200);
            }
            catch (error) {
            }
        });
    }
    // Este metodo permite validar los campos de atencionProceso --- >> esta pendiente de ser utilizado	
    validarInsert(camposValidar) {
        return __awaiter(this, void 0, void 0, function* () {
            let arrayList = [];
            arrayList.push(camposValidar);
            for (let x in camposValidar) {
                if (camposValidar[x] == '') {
                    return false;
                }
                else {
                    return true;
                }
            }
        });
    }
    // Metodo para adcionar los mensajes de validaciones 
    validadorMsgError(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (estado == 200) {
                data = {
                    status: estado,
                    msg: 'Datos registrados'
                };
                return data;
            }
            else {
                data = {
                    status: estado,
                    msg: 'Error en los datos ingresados'
                };
                return data;
            }
        });
    }
    //Este metodo permite validar los datos que llegan de atencionCampo
    validarArrayAtencionCampo(atencionCampo) {
        return __awaiter(this, void 0, void 0, function* () {
            let resAtencion = 1;
            atencionCampo.forEach((elemento, indice) => {
                if (elemento.CodCuestionarioCampo != '' &&
                    elemento.ValorCampo == '') {
                    resAtencion = 2;
                }
                if (elemento.CodCuestionarioCampo == '' &&
                    elemento.ValorCampo != '') {
                    resAtencion = 2;
                }
                if (elemento.CodCuestionarioCampo == '' &&
                    elemento.ValorCampo == '' &&
                    atencionCampo.length > 1) {
                    resAtencion = 2;
                }
                if (elemento.CodCuestionarioCampo == '' &&
                    elemento.ValorCampo == '' &&
                    atencionCampo.length == 1) {
                    resAtencion = 3;
                }
                if (elemento.CodCuestionarioCampo != '' &&
                    elemento.ValorCampo != '' &&
                    atencionCampo.length > 1) {
                    resAtencion = 1;
                }
            });
            return resAtencion;
        });
    }
};
AtencionController = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [AtencionDAO_1.AtencionDAO])
], AtencionController);
exports.default = AtencionController;
