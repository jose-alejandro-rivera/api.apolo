"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentacion Appolo Backend',
        version: '1.0.0',
    },
    host: "localhost:3000",
    basePath: "/api",
};
exports.swaggerOptions = {
    swaggerDefinition,
    apis: [__dirname + '/../../Api/routes/*.ts']
};
