import { Router, Request, Response, NextFunction } from 'express'
import FlujoController  from '../controllers/FlujoController'
import { Container } from "typescript-ioc"
import bodyParser from 'body-parser'
import morgan from 'morgan'
import flujoRouter from './routes/FlujoRouter'


class FlujoRouter {
  public router:Router
  private routesFlujo:any
    constructor() {
        this.router = Router()
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
        this.router.use(morgan('dev'))
        this.config()
        this.routes()
    }
    routes(){
      this.routesFlujo.router()
    }
    config(){
      this.routesFlujo = new flujoRouter(this.router)
    }
}
const FlujoRouters =  new FlujoRouter
export default FlujoRouters.router