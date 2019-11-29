import { Router } from 'express'
import  PasoController  from '../../Controllers/AtencionPasoCampoController'
import { Container } from "typescript-ioc";
import { Request, Response, NextFunction } from 'express'
import { request } from 'http';

export default class AtencionPasoCampoRouter {
    private app: Router
    constructor(router: Router) {
        this.app = router
    }

    router(): void {
        this.app.post('/atencion-paso-campo/create',
        async(req: Request, res: Response, next: NextFunction) => {
            try {
                const pasoController: PasoController = Container.get(PasoController);
                let respuesta = await pasoController.createAtencionPasoCampo(req.body);
                res.status(200).json({'data':respuesta});
              } catch(error) {
                console.log(error)
              }
        }
        )
    }    
}