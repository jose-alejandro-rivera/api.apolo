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
const FlujoController_1 = __importDefault(require("../../controllers/FlujoController"));
const typescript_ioc_1 = require("typescript-ioc");
class FlujoRouter {
    constructor(router) {
        this.app = router;
    }
    router() {
        this.app.get('/flujo/list/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getSteps(req.params);
                res.status(200).json(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
        this.app.get('/flujos/por/categorias/:id_categoriaFlujo', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getFlujoPorCategoria(req.params.id_categoriaFlujo);
                res.status(200).send(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
        this.app.get('/flujo/categorias', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getCategoriaFlujo(req, res, next);
                res.status(200).send(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
        this.app.get('/flujos/completos', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flujoController = typescript_ioc_1.Container.get(FlujoController_1.default);
                let responseModel = yield flujoController.getFlujoListaCompleta();
                res.status(200).send(responseModel);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.default = FlujoRouter;
