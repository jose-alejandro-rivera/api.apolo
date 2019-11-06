import swaggerJSDOC from 'swagger-jsdoc';
import { swaggerOptions } from '../config/swagger/swagger';

export const swaggerSpec = swaggerJSDOC(swaggerOptions);
