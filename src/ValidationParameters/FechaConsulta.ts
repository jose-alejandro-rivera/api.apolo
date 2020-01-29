import moments  from 'moment'

export default class FechaConsulta {

	constructor(){}

	getDateCurrent():string {
		const fechaToconfig = new Date()
    const fechaTo = moments(fechaToconfig).format("YYYY-MM-DD")
    return fechaTo
	}

	getDatePass(): string {
		const dateFromconfig = new Date()
    dateFromconfig.setDate(dateFromconfig.getDate() - 30)
    const fechaFrom = moments(dateFromconfig).format("YYYY-MM-DD")
    return fechaFrom
	}
	
}