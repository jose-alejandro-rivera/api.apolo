import express from 'express';
import routesLoader from "./routesLoader";
import { Container } from 'typescript-ioc';
import logger from './loggerLoader';
import DatabaseConnection from './databaseLoader';

export default async ({ expressApp }: { expressApp: express.Application }) => {

    /**
     * se carga la base de datos
     */
    Container.get(DatabaseConnection);

    /**
     * Se cargan todas las rutas
     */
    logger.debug('cargando rutas');
    return routesLoader({ app: expressApp });
};