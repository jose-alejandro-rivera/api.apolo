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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseLoader_1 = __importDefault(require("../Loaders/databaseLoader"));
const sql = __importStar(require("mssql"));
const typescript_ioc_1 = require("typescript-ioc");
/**
 *
 * @category DAO
 */
let AtencionDAO = class AtencionDAO {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
        // code...
    }
    createAtencion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { CodLogin, CodFlujo } = data;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.request()
                    .input('CodLogin', sql.Int, CodLogin)
                    .input('CodFlujo', sql.Int, CodFlujo)
                    .query(`INSERT INTO Atencion (CodLogin, CodFlujo, Fecha) VALUES (@CodLogin,@CodFlujo,getdate()); SELECT SCOPE_IDENTITY() as Id_Atencion;`);
                return result.recordset;
            }
            catch (error) {
                return error;
            }
        });
    }
    lastAtencion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.query(`SELECT TOP 1 CAST(Id_Atencion AS int) as Id_Atencion FROM Atencion ORDER BY Id_Atencion DESC `);
                return result.recordset;
            }
            catch (error) {
                return error;
            }
        });
    }
    validateAtencion(CodLogin, CodFlujo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                let validateLogin = yield sqlGetSteps.request()
                    .input('CodLogin', sql.Int, CodLogin)
                    .query `SELECT Id_Login, Usuario, Fecha FROM Login WHERE Id_Login = @CodLogin`;
                let validateFlujo = yield sqlGetSteps.request()
                    .input('CodFlujo', sql.Int, CodFlujo).
                    query `SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo WHERE Id_Flujo = @CodFlujo`;
                if (validateLogin.recordset.length > 0 && validateFlujo.recordset.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    //Filtra que metodos se ejecutaran segun los datos enviados
    createAtencionPasoCampo(atencionPaso, atencionProceso, atencionProcesoSalida, atencionCampo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let CodAtencionpaso;
                let codCuestionario;
                let codAtencionProsces;
                let codigopaso;
                let { CodPaso } = atencionPaso;
                codigopaso = yield this.consultaAtencionPaso(atencionPaso);
                if (CodPaso == codigopaso) {
                    CodAtencionpaso = yield this.createAtencionPaso(atencionPaso);
                    return CodAtencionpaso;
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    //Metodo que consulta si el codigo del paso enviado existe en la bd
    consultaAtencionPaso(atencionPaso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { CodPaso } = atencionPaso;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                this.result = yield sqlGetSteps.request()
                    .input('codPas', sql.Int, CodPaso)
                    .query('SELECT p.id_Paso FROM Paso p where p.id_Paso = @codPas');
                let cPaso = this.result.recordset[0].id_Paso;
                return cPaso;
            }
            catch (error) {
                return error;
            }
        });
    }
    //Metodo que crea una atecionPaso
    createAtencionPaso(atencionPaso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { CodAtencion, CodPaso, Secuencia, Soluciona } = atencionPaso;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                let id = yield this.consultaIdAtencionPaso();
                let SecuenciaC = id + 1;
                let result = yield sqlGetSteps.request()
                    .input('codAt', sql.Int, CodAtencion)
                    .input('codPas', sql.Int, CodPaso)
                    .input('secu', sql.Int, SecuenciaC)
                    .input('solu', sql.Bit, Soluciona)
                    .query('INSERT INTO AtencionPaso (CodAtencion,CodPaso,Secuencia,Soluciona,Fecha) VALUES (@codAt,@codPas,@secu,@solu,getdate()); SELECT SCOPE_IDENTITY() as Id_AtencionPaso;');
                let CodAtencionpaso = result.recordset[0].Id_AtencionPaso;
                return CodAtencionpaso;
            }
            catch (error) {
                return error;
            }
        });
    }
    //Consulta el ultimo id_atencionPaso
    consultaIdAtencionPaso() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idatenciopas;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const request = yield sqlGetSteps.request()
                    .query('SELECT TOP 1 Secuencia,Id_AtencionPaso FROM atencionPaso ORDER BY Id_AtencionPaso DESC');
                if (request.recordset.length > 0) {
                    idatenciopas = request.recordset[0].Secuencia;
                }
                else {
                    idatenciopas = 0;
                }
                return idatenciopas;
            }
            catch (error) {
                return error;
            }
        });
    }
    //Metodo que crea una atecionCampo
    createAtencionCampo(arrCuestionarioCampo, CodAtencionpaso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                for (let i = 0; i < arrCuestionarioCampo.length; i++) {
                    let CodCuestionarioCampo = arrCuestionarioCampo[i].CodCuestionarioCampo;
                    let ValorCampo = arrCuestionarioCampo[i].ValorCampo;
                    result = yield sqlGetSteps.request()
                        .input('codAtPas', sql.Int, CodAtencionpaso)
                        .input('codCuest', sql.Int, CodCuestionarioCampo)
                        .input('valCam', sql.VarChar, ValorCampo)
                        .query('INSERT INTO AtencionCampo (CodAtencionPaso,CodCuestionarioCampo,ValorCampo,Fecha) VALUES (@codAtPas,@codCuest,@valCam,getdate());');
                }
                return result.rowsAffected;
            }
            catch (error) {
                return error;
            }
        });
    }
    //Metodo que crea una atecionProceso	
    createAtencionProceso(idAtnPaso, atencionProceso, atencionProcesoSalida) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { CodProceso, TipoServicio, Servicio, Request, Response } = atencionProceso;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                let result = yield sqlGetSteps.request()
                    .input('codAtPas', sql.Int, idAtnPaso)
                    .input('codProces', sql.Int, CodProceso)
                    .input('tipoServ', sql.VarChar, TipoServicio)
                    .input('serv', sql.VarChar, Servicio)
                    .input('req', sql.VarChar, Request)
                    .input('res', sql.VarChar, Response)
                    .query('INSERT INTO AtencionProceso (CodAtencionPaso,CodProceso,TipoServicio,Servicio,Request,Response,Fecha) VALUES (@codAtPas,@codProces,@tipoServ,@serv,@req,@res,getdate()); SELECT SCOPE_IDENTITY() as Id_AtencionProceso;');
                let codAtencionProces = result.recordset[0].Id_AtencionProceso;
                this.createAtencionProcesoSalida(atencionProcesoSalida, codAtencionProces);
                return codAtencionProces;
            }
            catch (error) {
                return error;
            }
        });
    }
    //Metodo que crea una atecionProcesoSalida
    createAtencionProcesoSalida(atencionProcesoSalida, codAtencionProsces) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { CodProcesoSalida, Valor } = atencionProcesoSalida;
                const sqlGetSteps = yield this.databaseConnection.getPool();
                let result = yield sqlGetSteps.request()
                    .input('codAtProces', sql.Int, codAtencionProsces)
                    .input('codProceSalida', sql.Int, CodProcesoSalida)
                    .input('valCam', sql.VarChar, Valor)
                    .query('INSERT INTO AtencionProcesoSalida (CodAtencionProceso,CodProcesoSalida,Valor,Fecha) VALUES (@codAtProces,@codProceSalida,@valCam,getdate());');
                return this.result.rowsAffected;
            }
            catch (error) {
                return error;
            }
        });
    }
};
AtencionDAO = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [databaseLoader_1.default])
], AtencionDAO);
exports.AtencionDAO = AtencionDAO;
