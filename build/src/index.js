"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_validator_1 = __importDefault(require("express-validator"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
//const express = require('express')
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
    }
    config() {
        dotenv_1.default.config();
        this.app.set('port', process.env.PORT || '3000');
        this.app.use(morgan_1.default('dev'));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(express_validator_1.default());
        //this.app.use(express.json())
        //this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors_1.default({
            'allowedHeaders': ['sessionId', 'Content-Type'],
            'exposedHeaders': ['sessionId'],
            'origin': '*',
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'preflightContinue': false
        }));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server localhost:' + this.app.get('port'));
        });
    }
}
const inicializar = new Server();
inicializar.start();
