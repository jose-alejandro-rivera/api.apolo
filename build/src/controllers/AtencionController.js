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
const typescript_ioc_1 = require("typescript-ioc");
const connet_1 = __importDefault(require("../connet"));
const AtencionDAO_1 = require("../DAO/AtencionDAO");
let FlujoController = class FlujoController {
    constructor(AtencionDAO, databaseConnection) {
        this.AtencionDAO = AtencionDAO;
        this.databaseConnection = databaseConnection;
        this.flujos = [];
    }
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
};
FlujoController = __decorate([
    __param(0, typescript_ioc_1.Inject),
    __param(1, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [AtencionDAO_1.AtencionDAO,
        connet_1.default])
], FlujoController);
exports.default = FlujoController;