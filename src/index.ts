import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import expressValidator  from 'express-validator'
import bodyParser from 'body-parser'
import dotenv  from 'dotenv'

import flujoRouter from './api/routes/FlujoRouter'
//const express = require('express')
class Server{
	public app: express.Application
	constructor(){
		this.app = express()
		this.config()
		this.routes()
	}

	config(){
		dotenv.config();
		this.app.set('port',process.env.PORT || '3000')
		this.app.use(morgan('dev'))
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.use(bodyParser.json())
		this.app.use(expressValidator())
		//this.app.use(express.json())
		//this.app.use(express.urlencoded({ extended: false }))
		this.app.use(cors({
		  'allowedHeaders': ['sessionId', 'Content-Type'],
		  'exposedHeaders': ['sessionId'],
		  'origin': '*',
		  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
		  'preflightContinue': false
		}))

	}

	routes(){
		this.app.use('/',flujoRouter)

	}

	start(){
		this.app.listen(this.app.get('port'),() => {
			console.log('server localhost:'+ this.app.get('port'))
		})
	}
}

const inicializar = new Server()
inicializar.start()
