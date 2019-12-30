import swaggerJSDOC from 'swagger-jsdoc';
import { swaggerOptions } from '../Config/swagger/swagger';

export const swaggerSpec = swaggerJSDOC(swaggerOptions);
