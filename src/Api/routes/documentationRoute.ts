import { Router } from 'express';
import swaggerUi  from 'swagger-ui-express';
import { swaggerSpec } from '../../loaders/swaggerDocLoader';
import FlujoController  from '../../controllers/FlujoController';
import { Container } from "typescript-ioc";
import { Request, Response, NextFunction } from 'express';

/*export default (app: Router) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
}*/

export default class DocRouter {
    public app:Router
    constructor(router:Router) {
      this.app = router
    }
     router():void{
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}  