import { Router, Response, Request, NextFunction } from 'express'
import fs from 'fs'
import util from 'util'
import { Inject, Container } from "typescript-ioc"
import RegistroFotograficoController  from '../../Controllers/RegistroFotograficoController'


export default class RegistroFotograficoRouter {
	private app: Router

	constructor(router: Router){
		this.app =router
	}
	/**
		@parms NumOrden = 'Registro para guardar la orden como referencia '
		@parms CodPaso = 'Paso referencia de Imagen'
		@body imagen = 'imagen que se guarda en servidor de imagenes'
		@body nombreImagen = 'nombre e la imagen como referencia'
	**/
	router(): void {
		
		this.app.post(
			'/registro/fotografico/:NumOrden/:CodPaso',
			async (req:Request, res:Response, next:NextFunction) => {
			  const registroFotograficoController:RegistroFotograficoController = Container.get(RegistroFotograficoController)
        let responseModel = await registroFotograficoController.guardarRegistroFotografico(req)

				res.status(200).json(responseModel)
		})
	/**
		@parms NumOrden = 'Registro para guardar la orden como referencia '
		@parms CodPaso = 'Paso referencia de Imagen'
		@body imagen = 'imagen que se guarda en servidor de imagenes'
		@body nombreImagen = 'nombre e la imagen como referencia'
	**/
		this.app.patch(
			'/registro/fotografico/:NumOrden/:CodPaso',
			async (req:Request, res:Response, next:NextFunction) => {
			  const registroFotograficoController:RegistroFotograficoController = Container.get(RegistroFotograficoController)
        let responseModel = await registroFotograficoController.actualizarRegistroFotografico(req)

				res.status(200).json(responseModel)
		})
	}
}