"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AtencionController_1 = __importDefault(require("../../controllers/AtencionController"));
const typescript_ioc_1 = require("typescript-ioc");
class AtencionRoute {
    constructor(router) {
        this.app = router;
    }
    router() {
        this.app.post('/atencion/create', (req, res, next) => {
            try {
                console.log(req);
                const atencionController = typescript_ioc_1.Container.get(AtencionController_1.default);
                let responseModel = atencionController.createAtencion(req, res, next);
                return responseModel;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = AtencionRoute;
