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
const routesLoader_1 = __importDefault(require("./routesLoader"));
const loggerLoader_1 = __importDefault(require("./loggerLoader"));
exports.default = ({ expressApp }) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * se carga la base de datos
     */
    //Container.get(DatabaseConnection);
    /**
     * Se cargan todas las rutas
     */
    loggerLoader_1.default.debug('cargando rutas');
    return routesLoader_1.default({ app: expressApp });
});
