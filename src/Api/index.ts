import { Router, Request, Response, NextFunction } from 'express'
import FlujoController  from '../controllers/FlujoController'
import { Container } from "typescript-ioc"
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import flujoRouter from './routes/FlujoRouter'
import  procesoRouter from './routes/ProcesoRouter'
import  atencionRouter from './routes/AtencionRouter'

class FlujoRouter {
  public router:Router
  private routesFlujo:any
  private routesPasos:any
  private routesAtencion:any

  constructor() {
    this.router = Router()
    this.config()
    this.routes()
  }
  routes(){
    this.routesFlujo.router()
    this.routesPasos.router()
    this.routesAtencion.router()
  }
  config(){
    this.router.use(bodyParser.json());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(morgan('dev'))
    this.router.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }))
    this.routesFlujo = new flujoRouter(this.router)
    this.routesPasos = new procesoRouter(this.router)
    this.routesAtencion = new atencionRouter(this.router)
  }
}
const FlujoRouters =  new FlujoRouter
export default FlujoRouters.router