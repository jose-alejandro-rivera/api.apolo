"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const transports = [];
if (process.env.NODE_ENV !== 'test') {
    transports.push(new winston_1.default.transports.File({
        level: 'silly',
        filename: `${app_root_path_1.default.path}/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5
    }));
}
else {
    /*transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            )
        })
    )*/
    transports.push(new winston_1.default.transports.File({
        level: 'silly',
        filename: `${app_root_path_1.default.path}/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5
    }));
}
//console.log('configurado logger', config.logs.level, winston.config.npm.levels);
const LoggerInstance = winston_1.default.createLogger({
    level: config_1.default.logs.level,
    levels: winston_1.default.config.npm.levels,
    transports
});
//console.log('configurado logger', LoggerInstance);
exports.default = LoggerInstance;
