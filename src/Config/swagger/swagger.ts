let swaggerDefinition = {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Documentacion Appolo Backend', // Title (required)
      version: '1.0.0', // Version (required)
    },
    host: "localhost:3000", // the host or url of the app
    basePath: "/api", // the basepath of your endpoint
};

export const swaggerOptions = {
    swaggerDefinition,
    apis: [__dirname + '/../../Api/routes/*.ts']
};