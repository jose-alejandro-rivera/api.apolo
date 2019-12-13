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
let FlujoListDAO = class FlujoListDAO {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
        // code...
    }
    getFlujosPorCategoria(Id_CategoriaFlujo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.request()
                    .input('Id_CategoriaFlujo', sql.Int, Id_CategoriaFlujo)
                    .query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND CodCategoriaFlujo=@Id_CategoriaFlujo`);
                return Object.assign(result.recordset);
            }
            catch (error) {
                return error;
            }
        });
    }
    //OBTIENE EL LISTADO DE PASOS DE LA CONSULTA EN FORMATO JSON
    getFlujoList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryFlujo;
            try {
                let activo = 1;
                const connect = yield this.databaseConnection.getPool();
                queryFlujo = yield connect.request()
                    .input('id_flujo', sql.Int, id)
                    .input('activo', sql.BigInt, activo)
                    .query(`SELECT DISTINCT
									 fl.Id_flujo 
									,fl.NomFlujo 
									,fl.CodCategoriaFlujo
									,fl.CodPaso_Inicial 
									,fl.Descripcion 
									,fl.Orden 

									,( SELECT 
											 tp.Id_TipoPaso
											,tp.NomTipoPaso
											,ps.Id_Paso
											,ps.NomPaso
											,ps.Descripcion
										 FROM Paso ps 
										 INNER JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = ps.Id_Paso  OR fp.CodPaso_Destino = ps.Id_Paso
										 INNER JOIN TipoPaso	tp ON tp.Id_TipoPaso = ps.CodTipoPaso
										 WHERE fp.CodFlujo = @id_flujo AND tp.Activo = @activo
										 GROUP BY 
										   ps.NomPaso
											,ps.Descripcion
											,ps.Id_Paso
											,tp.Id_TipoPaso
											,tp.NomTipoPaso
										 FOR JSON PATH
										) AS Pasos

									,( SELECT 
											 fp.Id_FlujoPaso 
											,fp.CodFlujo 
											,fp.CodPaso_Origen 
											,fp.CodPaso_Destino 
											,fp.Orden
											,fp.ExpresionEjecucion
											,fp.finaliza 
									  FROM FlujoPaso fp 
									  WHERE CodFlujo = @id_flujo AND fp.Activo = @activo
									  FOR JSON PATH
									) AS FlujoPasos 

									,( SELECT
											 ct.Id_Cuestionario  
											,ct.NomCuestionario 
											,ct.Descripcion 
											,cc.Id_CuestionarioCampo
											,cc.NomCuestionarioCampo
											,cc.Sigla 
											,cc.Orden 
											,cc.Obligatorio 
											,cc.CodCampo_Dependencia
											,cc.CodCuestionario
											,ca.Id_Campo
											,ca.NomCampo 
											,ca.Descripcion AS campoDescripcion
											,ca.Tipo 
											,ca.Longitud 
											,ca.ExpresionRegular
											,ps.Id_Paso
										  FROM  Paso ps
										INNER JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = ps.Id_Paso  OR fp.CodPaso_Destino = ps.Id_Paso
										LEFT JOIN  Cuestionario ct ON ps.CodCuestionario = ct.Id_Cuestionario 
										INNER JOIN CuestionarioCampo cc ON cc.CodCuestionario = ct.Id_Cuestionario 
										INNER JOIN Campo ca ON  ca.Id_Campo = cc.CodCampo
									  WHERE  fp.CodFlujo = @id_flujo AND fp.Activo = @activo AND ps.Activo = @activo AND ct.Activo = @activo
									  GROUP BY
											 ct.Id_Cuestionario  
											,ct.NomCuestionario 
											,ct.Descripcion 
											,cc.Id_CuestionarioCampo
											,cc.NomCuestionarioCampo
											,cc.Sigla 
											,cc.Orden 
											,cc.Obligatorio 
											,cc.CodCampo_Dependencia
											,cc.CodCuestionario
											,ca.Id_Campo
											,ca.NomCampo 
											,ca.Descripcion 
											,ca.Tipo 
											,ca.Longitud 
											,ca.ExpresionRegular
											,ps.Id_Paso
										ORDER BY ps.Id_Paso ASC
										FOR JSON PATH
									) AS Cuestionarios

									,( SELECT  
									    pc.Id_Proceso
									   ,pc.NomProceso
									   ,pc.Descripcion
									   ,pc.Servicio
									   ,pc.TipoServicio
									   ,ps.Id_Paso
									   ,pcs.Id_ProcesoSalida
									   ,pcs.NomProcesoSalida
									   ,pcs.Sigla
									   ,pcs.Criterio_Busqueda
									  FROM Paso ps 
										INNER JOIN FlujoPaso AS fp ON fp.CodPaso_Origen = ps.Id_Paso  OR fp.CodPaso_Destino = ps.Id_Paso
										LEFT JOIN Proceso pc ON pc.Id_Proceso = ps.CodProceso
										INNER JOIN ProcesoSalida pcs ON pcs.CodProceso = pc.Id_Proceso
										WHERE fp.CodFlujo = @id_flujo AND fp.Activo = @activo
									  GROUP BY 
										   pc.Id_Proceso
										  ,pc.NomProceso
										  ,pc.Descripcion
										  ,pc.Servicio
										  ,pc.Servicio
										  ,pc.TipoServicio
										  ,ps.Id_Paso
										  ,pcs.Id_ProcesoSalida
										  ,pcs.NomProcesoSalida
										  ,pcs.Sigla
										  ,pcs.Criterio_Busqueda
									  FOR JSON PATH
									) AS Procesos
									FROM Flujo fl
									LEFT JOIN FlujoPaso fp ON fp.CodFlujo = fl.CodCategoriaFlujo
									LEFT JOIN Paso ps ON ps.Id_Paso = fl.CodPaso_inicial
									LEFT JOIN TipoPaso tp ON tp.Id_TipoPaso = ps.CodTipoPaso
									WHERE fl.Id_flujo = @id_flujo AND fl.Activo = @activo
									FOR JSON PATH`);
                return queryFlujo;
            }
            catch (error) {
                queryFlujo = { rowsAffected: error.name };
                return queryFlujo;
            }
        });
    }
    getCategoriaFlujoList() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlGetSteps = yield this.databaseConnection.getPool();
            const result = yield sqlGetSteps.query(`SELECT Id_CategoriaFlujo,NomCategoriaFlujo,Activo,Fecha,Usuario FROM categoriaFlujo where Activo=1`);
            return result;
        });
    }
    validateFlujoExist(Id_Flujo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlGetSteps = yield this.databaseConnection.getPool();
                const result = yield sqlGetSteps.request()
                    .input('Id_Flujo', sql.Int, Id_Flujo)
                    .query(`SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo where Activo=1 AND Id_Flujo=@Id_Flujo`);
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
