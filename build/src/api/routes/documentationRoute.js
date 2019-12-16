"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocLoader_1 = require("../../Loaders/swaggerDocLoader");
class DocRouter {
    constructor(router) {
        this.app = router;
    }
    router() {
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocLoader_1.swaggerSpec));
    }
}
exports.default = DocRouter;
