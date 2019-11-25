"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let swaggerDefinition = {
    info: {
        title: 'documentación swagger',
        version: '1.0.0',
        description: 'documentación inicial del loginAsesor5'
    },
    host: "localhost:3000",
    basePath: "/",
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header'
        }
    }
};
exports.swaggerOptions = {
    swaggerDefinition,
    apis: [__dirname + '/../../api/routes/*.js']
};
//console.log(swaggerOptions.apis);
