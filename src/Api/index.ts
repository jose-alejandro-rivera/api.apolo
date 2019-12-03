import { Router, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import flujoRouter from './routes/FlujoRouter'
import  procesoRouter from './routes/ProcesoRouter'
import  atencionRouter from './routes/AtencionRouter'
import  pasoRouter from './routes/AtencionPasoCampoRouter'
import  DocRouter from './routes/documentationRoute'


class GeneralRouter {
  public router:Router
  private routesFlujo:any
  private routesAtencion:any
  private routesProceso:any
  private routeAtencionPasoCampo: any
  private routeDocSwagger : any

  constructor() {
    this.router = Router()
    this.config()
    this.routes()
  }
  routes(){
    this.routesFlujo.router()
    this.routesAtencion.router()
    this.routesProceso.router()
    this.routeAtencionPasoCampo.router()
    this.routeDocSwagger.router();
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
    this.routesAtencion = new atencionRouter(this.router)
    this.routesProceso = new procesoRouter(this.router)
    this.routeAtencionPasoCampo = new pasoRouter(this.router)
    this.routeDocSwagger = new DocRouter(this.router)
  }
}
const GeneralRouters =  new GeneralRouter
export default GeneralRouters.router