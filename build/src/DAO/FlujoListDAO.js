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
Object.defineProperty(exports, "__esModule", { value: true });
const databaseLoader_1 = __importDefault(require("../loaders/databaseLoader"));
const typescript_ioc_1 = require("typescript-ioc");
/**
 *
 * @category DAO
 */
let FlujoListDAO = class FlujoListDAO {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
        // code...
    }
    getFlujosPorCategoria(Id_CategoriaFlujo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND CodCategoriaFlujo=${Id_CategoriaFlujo}`);
                return Object.assign(result.recordset);
            }
            catch (error) {
                return error;
            }
        });
    }
    getFlujosComplete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.request().query(`SELECT f.Id_Flujo,
														f.NomFlujo,
													(SELECT cf.Id_CategoriaFlujo as 'Id_CategoriaFlujo',
														cf.NomCategoriaFlujo as 'NomCategoriaFlujo',
														cf.Usuario as 'Usuario'
													FROM CategoriaFlujo cf
													WHERE cf.Id_CategoriaFlujo = f.CodCategoriaFlujo
													FOR JSON PATH,ROOT('Categorias')) AS CategoriaFlujo,
													(SELECT p.Id_Paso,
														p.NomPaso,
														p.Descripcion,
														p.Activo,

													(SELECT c.Id_Cuestionario,
															c.NomCuestionario,
															c.Descripcion,
															c.Activo,

														(SELECT ca.Id_Campo,
																ca.NomCampo,
																ca.Descripcion,
																ca.Tipo,
																ca.Longitud
														FROM Campo AS ca
														JOIN CuestionarioCampo AS cc ON cc.CodCampo=ca.Id_Campo
														WHERE cc.CodCuestionario=c.Id_Cuestionario
															FOR JSON PATH,ROOT('Pasos')) AS Pasos
													FROM Cuestionario AS c
													WHERE c.Id_Cuestionario=p.CodCuestionario
														FOR JSON PATH,ROOT('Cuestionario')) AS Cuestionario,
														p.CodProceso
													FROM Paso p
													JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = p.Id_Paso
													OR fp.CodPaso_Destino = p.Id_Paso
													WHERE fp.CodFlujo = f.Id_Flujo
													FOR JSON PATH,ROOT('PasosAsociados')) AS PasosAsociados,
														f.Descripcion,
														f.Orden,
														f.Activo
													FROM Flujo AS f
													FOR JSON PATH, ROOT('flujo')`);
                return Object.assign(result.recordset);
            }
            catch (error) {
                return error;
            }
        });
    }
    //OBTIENE EL LISTADO DE PASOS DE LA CONSULTA EN FORMATO JSON
    getFlujoList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                let result = yield sqlGetSteps.request()
                    .query(`SELECT DISTINCT 
						  p.Id_Paso as 'pasosProceso.Id_Paso'
						  ,p.NomPaso  as 'pasosProceso.NomPaso'
						  ,p.Descripcion as 'pasosProceso.Descripcion'
						  ,c.NomCuestionario as 'cuestionariosPaso.NomCuestionario'
						  ,c.Descripcion as 'cuestionariosPaso.Descripcion'
						  ,(SELECT
						    pa.Id_Paso as 'paso.Id_Paso'
						    ,cc.Orden as 'CuestionarioCampo.Orden'
						    ,CASE WHEN cc.Obligatorio = 1 THEN 'true' ELSE 'false' END  as 'CuestionarioCampo.Obligatorio'
						    ,ca.NomCampo as 'campos.NomCampo'
						    ,ca.Descripcion as 'campos.Descripcion'
						    ,ca.tipo as 'campos.tipo'
						    ,ca.Longitud as 'campos.Longitud'
						    ,cl.Llave as 'campoLista.Llave'
						    ,cl.Descripcion as 'campoLista.Descripcion'
						    FROM Campo ca
						    LEFT JOIN CampoLista cl ON ca.Id_Campo = cl.CodCampo
						    INNER JOIN CuestionarioCampo cc ON  ca.Id_Campo = cc.CodCampo
						    INNER JOIN Cuestionario AS c ON  c.Id_Cuestionario = cc.CodCuestionario
						    INNER JOIN Paso AS pa ON pa.CodCuestionario = c.Id_Cuestionario AND pa.Id_Paso =p.Id_Paso
						    FOR JSON PATH, ROOT('CuestionarioCampo')
						    ) AS cuestionario
						FROM Paso AS p
						LEFT JOIN Cuestionario AS c ON p.CodCuestionario = c.Id_Cuestionario 
						LEFT JOIN CuestionarioCampo AS cc ON  c.Id_Cuestionario = cc.CodCuestionario
						LEFT JOIN Campo AS ca ON cc.CodCampo = ca.Id_Campo
						LEFT JOIN CampoLista cl ON ca.Id_Campo = cl.CodCampo
						GROUP BY
						 p.Id_Paso
						,p.NomPaso
						,p.Descripcion
						,c.NomCuestionario
						,c.Descripcion
						FOR JSON PATH, ROOT('pasos')`);
                let data = result.recordsets;
                return data;
            }
            catch (error) {
                return error;
            }
        });
    }
    getCategoriaFlujoList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.query(`SELECT Id_CategoriaFlujo,NomCategoriaFlujo,Activo,Fecha,Usuario FROM categoriaFlujo where Activo=1`);
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
    validateFlujoExist(Id_Flujo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND Id_Flujo=${Id_Flujo}`);
                if (result.rowsAffected[0] > 0) {
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
};
FlujoListDAO = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [databaseLoader_1.default])
], FlujoListDAO);
exports.FlujoListDAO = FlujoListDAO;
