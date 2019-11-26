"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const FlujoRouter_1 = __importDefault(require("./routes/FlujoRouter"));
const ProcesoRouter_1 = __importDefault(require("./routes/ProcesoRouter"));
const AtencionRouter_1 = __importDefault(require("./routes/AtencionRouter"));
class GeneralRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
        this.routes();
    }
    routes() {
        this.routesFlujo.router();
        this.routesAtencion.router();
        this.routesProceso.router();
    }
    config() {
        this.router.use(body_parser_1.default.json());
        this.router.use(body_parser_1.default.urlencoded({ extended: true }));
        this.router.use(morgan_1.default('dev'));
        this.router.use(cors_1.default({
            'allowedHeaders': ['sessionId', 'Content-Type'],
            'exposedHeaders': ['sessionId'],
            'origin': '*',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'preflightContinue': false
        }));
        this.routesFlujo = new FlujoRouter_1.default(this.router);
        this.routesAtencion = new AtencionRouter_1.default(this.router);
        this.routesProceso = new ProcesoRouter_1.default(this.router);
    }
}
const GeneralRouters = new GeneralRouter;
exports.default = GeneralRouters.router;
