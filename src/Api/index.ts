import { Router, Request, Response, NextFunction } from 'express'
import FlujoController  from '../controllers/FlujoController'
import { Container } from "typescript-ioc"
import bodyParser from 'body-parser'
import morgan from 'morgan'

class FlujoRouter {
	public router:Router
	constructor() {
		this.router = Router()
		this.routes()
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(morgan('dev'))
	}
	routes(){
		    this.router.get(
        '/flujo/list/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const flujoController: FlujoController = Container.get(FlujoController);
                let responseModel = await flujoController.getSteps(req.param);
                res.status(200).send(responseModel);
            } catch(error) {
            	console.log(error)
                /*if(err instanceof ExceptionLogin) {
                    let error = {
                        IdMessage: err.codigo,
                        Message: err.message
                    };
                    res.status(500).send(error);
                } else {
                    let error = {
                        IdMessage: 0,
                        Message: err
                    };
                    LoggerInstance.error('error: ', error);
                    res.statusCode = 500;
                    res.send(err);
                }*/
            }
        }
    );
	}
}
const FlujoRouters =  new FlujoRouter
export default FlujoRouters.router