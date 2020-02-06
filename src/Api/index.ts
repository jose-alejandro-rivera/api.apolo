import { Router } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import flujoRouter from './routes/FlujoRouter'
import procesoRouter from './routes/ProcesoRouter'
import atencionRouter from './routes/AtencionRouter'
import DocRouter from './routes/DocumentationRoute'
import IntegracionToaRouter from './routes/IntegracionToaRouter'
import RemotaRouter from './routes/RemotaRouter'
import AutoconfiguracionBATVRouter from './routes/AutoconfiguracionBATVRoute'

class GeneralRouter {
  public router:Router
  private routesFlujo:any
  private routesAtencion:any
  private routesProceso:any
  private routeDocSwagger : any
  private routeIntegracionToa:any
  private routeRemotaRouter:any
  private routeAutoConfBATV:any

  constructor() {
    this.router = Router()
    this.config()
    this.routes()
  }
  routes(){
    this.routesFlujo.router()
    this.routesAtencion.router()
    this.routesProceso.router()
    this.routeDocSwagger.router()
    this.routeIntegracionToa.router()
    this.routeRemotaRouter.router()
    this.routeAutoConfBATV.router()
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
    this.routeDocSwagger = new DocRouter(this.router)
    this.routeIntegracionToa  = new IntegracionToaRouter(this.router)
    this.routeRemotaRouter = new RemotaRouter(this.router)
    this.routeAutoConfBATV = new AutoconfiguracionBATVRouter(this.router)
  }
}
const GeneralRouters =  new GeneralRouter
export default GeneralRouters.router