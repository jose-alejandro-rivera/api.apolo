import { Router } from 'express';
import swaggerUi  from 'swagger-ui-express';
import { swaggerSpec } from '../../Loaders/swaggerDocLoader';

export default class DocRouter {
    public app:Router
    constructor(router:Router) {
      this.app = router
    }
     router():void{
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}  