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
                const result = yield sqlGetSteps.query(`INSERT INTO Atencion (CodLogin, CodFlujo, Fecha) VALUES (${CodLogin},${CodFlujo},getdate()); SELECT SCOPE_IDENTITY() as Id_Atencion;`);
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
                let validateLogin = yield sqlGetSteps.query `SELECT Id_Login, Usuario, Fecha FROM Login WHERE Id_Login = ${CodLogin}`;
                let validateFlujo = yield sqlGetSteps.query `SELECT Id_Flujo,NomFlujo,CodCategoriaFlujo,CodPaso_Inicial,Descripcion,Orden,Activo,Fecha,Usuario FROM Flujo WHERE Id_Flujo = ${CodFlujo}`;
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
};
AtencionDAO = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [databaseLoader_1.default])
], AtencionDAO);
exports.AtencionDAO = AtencionDAO;
