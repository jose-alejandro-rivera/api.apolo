import { Router, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import flujoRouter from './routes/FlujoRouter'
import  procesoRouter from './routes/ProcesoRouter'
import  atencionRouter from './routes/AtencionRouter'

class GeneralRouter {
  public router:Router
  private routesFlujo:any
  private routesPasos:any
  private routesAtencion:any
  private routesProceso:any

  constructor() {
    this.router = Router()
    this.config()
    this.routes()
  }
  routes(){
    this.routesFlujo.router()
    this.routesPasos.router()
    this.routesAtencion.router()
    this.routesProceso.router()
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
    this.routesProceso = new procesoRouter(this.router)
  }
}
const GeneralRouters =  new GeneralRouter
export default GeneralRouters.router