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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql = __importStar(require("mssql"));
const loggerLoader_1 = __importDefault(require("./loggerLoader"));
const typescript_ioc_1 = require("typescript-ioc");
const config_1 = __importDefault(require("../config"));
/**
 * @category Database
 */
let DatabaseConnection = class DatabaseConnection {
    constructor() {
        loggerLoader_1.default.info('configuración base de datos' + JSON.stringify(config_1.default.database));
        this.pool = new sql.ConnectionPool(config_1.default.database).connect().then(pool => {
            loggerLoader_1.default.info('Connected to MSSQL');
            return pool;
        }).catch(err => {
            loggerLoader_1.default.error('Database Connection Failed! Bad Config: ', err);
            throw 'No hay conexión a la BD!!';
        });
    }
    getPool() {
        return this.pool;
    }
};
DatabaseConnection = __decorate([
    typescript_ioc_1.Singleton,
    __metadata("design:paramtypes", [])
], DatabaseConnection);
exports.default = DatabaseConnection;
